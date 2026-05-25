use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use rusqlite::Connection;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum FileType {
    Directory,
    File,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileNode {
    pub name: String,
    pub file_type: FileType,
    pub content: Option<String>,
    pub children: HashMap<String, FileNode>,
    pub permissions: Permissions,
    pub created_by: String,
    pub created_at: u64,
    pub modified_at: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Permissions {
    pub owner: String,
    pub read_users: Vec<String>,
    pub write_users: Vec<String>,
    pub public_read: bool,
    pub public_write: bool,
}

impl Permissions {
    pub fn new(owner: String) -> Self {
        Permissions {
            owner: owner.clone(),
            read_users: vec![owner.clone()],
            write_users: vec![owner],
            public_read: true,
            public_write: false,
        }
    }
    
    pub fn can_read(&self, user: &str) -> bool {
        self.public_read || 
        self.owner == user || 
        self.read_users.contains(&user.to_string())
    }
    
    pub fn can_write(&self, user: &str) -> bool {
        self.public_write || 
        self.owner == user || 
        self.write_users.contains(&user.to_string())
    }
    
    pub fn add_read_permission(&mut self, user: String) {
        if !self.read_users.contains(&user) {
            self.read_users.push(user);
        }
    }
    
    pub fn add_write_permission(&mut self, user: String) {
        if !self.write_users.contains(&user) {
            self.write_users.push(user);
        }
    }
}

impl FileNode {
    pub fn new_directory(name: String, owner: String) -> Self {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        FileNode {
            name,
            file_type: FileType::Directory,
            content: None,
            children: HashMap::new(),
            permissions: Permissions::new(owner.clone()),
            created_by: owner,
            created_at: now,
            modified_at: now,
        }
    }
    
    pub fn new_file(name: String, content: String, owner: String) -> Self {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        FileNode {
            name,
            file_type: FileType::File,
            content: Some(content),
            children: HashMap::new(),
            permissions: Permissions::new(owner.clone()),
            created_by: owner,
            created_at: now,
            modified_at: now,
        }
    }
    
    pub fn add_child(&mut self, child: FileNode) -> Result<(), String> {
        if self.file_type != FileType::Directory {
            return Err("Cannot add children to a file".to_string());
        }
        
        self.children.insert(child.name.clone(), child);
        self.modified_at = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        Ok(())
    }
    
    pub fn get_child(&self, name: &str) -> Option<&FileNode> {
        self.children.get(name)
    }
    
    pub fn get_child_mut(&mut self, name: &str) -> Option<&mut FileNode> {
        self.children.get_mut(name)
    }
    
    pub fn list_children(&self) -> Vec<String> {
        let mut items: Vec<String> = self.children.keys()
            .map(|name| {
                let child = &self.children[name];
                match child.file_type {
                    FileType::Directory => format!("{}/", name),
                    FileType::File => name.clone(),
                }
            })
            .collect();
        items.sort();
        items
    }
    
    pub fn update_content(&mut self, content: String) -> Result<(), String> {
        if self.file_type != FileType::File {
            return Err("Cannot set content on a directory".to_string());
        }
        
        self.content = Some(content);
        self.modified_at = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        Ok(())
    }
}

#[derive(Debug)]
pub struct FileSystem {
    pub root: FileNode,
}

impl FileSystem {
    pub fn new(owner: String) -> Self {
        FileSystem {
            root: FileNode::new_directory("/".to_string(), owner),
        }
    }
    
    pub fn resolve_path(&self, path: &str) -> Option<&FileNode> {
        if path == "/" {
            return Some(&self.root);
        }
        
        let parts: Vec<&str> = path.trim_start_matches('/').split('/').collect();
        let mut current = &self.root;
        
        for part in parts {
            if part.is_empty() {
                continue;
            }
            current = current.get_child(part)?;
        }
        
        Some(current)
    }
    
    pub fn resolve_path_mut(&mut self, path: &str) -> Option<&mut FileNode> {
        if path == "/" {
            return Some(&mut self.root);
        }
        
        let parts: Vec<&str> = path.trim_start_matches('/').split('/').collect();
        let mut current = &mut self.root;
        
        for part in parts {
            if part.is_empty() {
                continue;
            }
            current = current.get_child_mut(part)?;
        }
        
        Some(current)
    }
    
    pub fn create_directory(&mut self, path: &str, owner: String) -> Result<(), String> {
        let (parent_path, dir_name) = self.split_path(path)?;
        
        let parent = self.resolve_path_mut(&parent_path)
            .ok_or_else(|| format!("Parent directory not found: {}", parent_path))?;
            
        if !parent.permissions.can_write(&owner) {
            return Err("Permission denied: cannot write to parent directory".to_string());
        }
        
        if parent.children.contains_key(&dir_name) {
            return Err("Directory already exists".to_string());
        }
        
        let new_dir = FileNode::new_directory(dir_name.clone(), owner);
        parent.add_child(new_dir)?;
        
        Ok(())
    }
    
    pub fn create_file(&mut self, path: &str, content: String, owner: String) -> Result<(), String> {
        let (parent_path, file_name) = self.split_path(path)?;
        
        let parent = self.resolve_path_mut(&parent_path)
            .ok_or_else(|| format!("Parent directory not found: {}", parent_path))?;
            
        if !parent.permissions.can_write(&owner) {
            return Err("Permission denied: cannot write to parent directory".to_string());
        }
        
        let new_file = FileNode::new_file(file_name.clone(), content, owner);
        parent.add_child(new_file)?;
        
        Ok(())
    }
    
    fn split_path(&self, path: &str) -> Result<(String, String), String> {
        let path = path.trim_end_matches('/');
        if path == "/" {
            return Err("Cannot create root directory".to_string());
        }
        
        let parts: Vec<&str> = path.trim_start_matches('/').split('/').collect();
        if parts.is_empty() || parts[parts.len() - 1].is_empty() {
            return Err("Invalid path".to_string());
        }
        
        let file_name = parts[parts.len() - 1].to_string();
        let parent_path = if parts.len() == 1 {
            "/".to_string()
        } else {
            "/".to_string() + &parts[0..parts.len() - 1].join("/")
        };
        
        Ok((parent_path, file_name))
    }

    pub fn remove(&mut self, path: &str, user: &str) -> Result<(), String> {
        if path == "/" {
            return Err("Cannot remove root directory".to_string());
        }
        
        let (parent_path, item_name) = self.split_path(path)?;
        
        let parent = self.resolve_path_mut(&parent_path)
            .ok_or_else(|| format!("Parent directory not found: {}", parent_path))?;
            
        if !parent.permissions.can_write(user) {
            return Err("Permission denied: cannot write to parent directory".to_string());
        }
        
        if !parent.children.contains_key(&item_name) {
            return Err(format!("File or directory not found: {}", path));
        }
        
        let item = parent.children.get(&item_name).unwrap();
        if item.permissions.owner != user && !parent.permissions.can_write(user) {
            return Err("Permission denied: cannot remove item".to_string());
        }
        
        parent.children.remove(&item_name);
        parent.modified_at = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
            
        Ok(())
    }

    pub fn save_to_db<P: AsRef<Path>>(&self, db_path: P) -> Result<(), String> {
        let conn = Connection::open(db_path)
            .map_err(|e| format!("Failed to open database: {}", e))?;
        
        self.create_tables(&conn)?;
        self.save_node_recursive(&conn, &self.root, "/")?;
        
        Ok(())
    }
    
    pub fn load_from_db<P: AsRef<Path>>(db_path: P, owner: String) -> Result<Self, String> {
        if !db_path.as_ref().exists() {
            return Ok(FileSystem::new(owner));
        }
        
        let conn = Connection::open(db_path)
            .map_err(|e| format!("Failed to open database: {}", e))?;
        
        let root = Self::load_node_recursive(&conn, "/", "/")?
            .unwrap_or_else(|| FileNode::new_directory("/".to_string(), owner));
        
        Ok(FileSystem { root })
    }
    
    fn create_tables(&self, conn: &Connection) -> Result<(), String> {
        conn.execute(
            "CREATE TABLE IF NOT EXISTS files (
                path TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                file_type TEXT NOT NULL,
                content TEXT,
                owner TEXT NOT NULL,
                created_by TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                modified_at INTEGER NOT NULL
            )",
            [],
        ).map_err(|e| format!("Failed to create files table: {}", e))?;
        
        conn.execute(
            "CREATE TABLE IF NOT EXISTS permissions (
                path TEXT NOT NULL,
                user_id TEXT NOT NULL,
                permission_type TEXT NOT NULL,
                PRIMARY KEY (path, user_id, permission_type)
            )",
            [],
        ).map_err(|e| format!("Failed to create permissions table: {}", e))?;
        
        conn.execute(
            "CREATE TABLE IF NOT EXISTS public_permissions (
                path TEXT PRIMARY KEY,
                public_read BOOLEAN NOT NULL,
                public_write BOOLEAN NOT NULL
            )",
            [],
        ).map_err(|e| format!("Failed to create public_permissions table: {}", e))?;
        
        Ok(())
    }
    
    fn save_node_recursive(&self, conn: &Connection, node: &FileNode, path: &str) -> Result<(), String> {
        let file_type_str = match node.file_type {
            FileType::Directory => "directory",
            FileType::File => "file",
        };
        
        conn.execute(
            "INSERT OR REPLACE INTO files 
             (path, name, file_type, content, owner, created_by, created_at, modified_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
            [
                path,
                &node.name,
                file_type_str,
                &node.content.as_deref().unwrap_or(""),
                &node.permissions.owner,
                &node.created_by,
                &node.created_at.to_string(),
                &node.modified_at.to_string(),
            ],
        ).map_err(|e| format!("Failed to save file: {}", e))?;
        
        conn.execute("DELETE FROM permissions WHERE path = ?1", [path])
            .map_err(|e| format!("Failed to clear permissions: {}", e))?;
        
        for user in &node.permissions.read_users {
            conn.execute(
                "INSERT INTO permissions (path, user_id, permission_type) VALUES (?1, ?2, 'read')",
                [path, user],
            ).map_err(|e| format!("Failed to save read permission: {}", e))?;
        }
        
        for user in &node.permissions.write_users {
            conn.execute(
                "INSERT INTO permissions (path, user_id, permission_type) VALUES (?1, ?2, 'write')",
                [path, user],
            ).map_err(|e| format!("Failed to save write permission: {}", e))?;
        }
        
        conn.execute(
            "INSERT OR REPLACE INTO public_permissions (path, public_read, public_write) VALUES (?1, ?2, ?3)",
            [path, &node.permissions.public_read.to_string(), &node.permissions.public_write.to_string()],
        ).map_err(|e| format!("Failed to save public permissions: {}", e))?;
        
        for (child_name, child_node) in &node.children {
            let child_path = if path == "/" {
                format!("/{}", child_name)
            } else {
                format!("{}/{}", path, child_name)
            };
            self.save_node_recursive(conn, child_node, &child_path)?;
        }
        
        Ok(())
    }
    
    fn load_node_recursive(conn: &Connection, path: &str, name: &str) -> Result<Option<FileNode>, String> {
        let mut stmt = conn.prepare(
            "SELECT file_type, content, owner, created_by, created_at, modified_at FROM files WHERE path = ?1"
        ).map_err(|e| format!("Failed to prepare query: {}", e))?;
        
        let file_data: Result<(String, String, String, String, u64, u64), rusqlite::Error> = stmt.query_row([path], |row| {
            Ok((
                row.get(0)?,
                row.get(1)?,
                row.get(2)?,
                row.get(3)?,
                row.get(4)?,
                row.get(5)?,
            ))
        });
        
        let (file_type_str, content, owner, created_by, created_at, modified_at) = match file_data {
            Ok(data) => data,
            Err(rusqlite::Error::QueryReturnedNoRows) => return Ok(None),
            Err(e) => return Err(format!("Database error: {}", e)),
        };
        
        let file_type = match file_type_str.as_str() {
            "directory" => FileType::Directory,
            "file" => FileType::File,
            _ => return Err("Invalid file type in database".to_string()),
        };
        
        let mut permissions = Permissions::new(owner);
        
        let mut perm_stmt = conn.prepare(
            "SELECT user_id, permission_type FROM permissions WHERE path = ?1"
        ).map_err(|e| format!("Failed to prepare permissions query: {}", e))?;
        
        let perm_rows = perm_stmt.query_map([path], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
        }).map_err(|e| format!("Failed to query permissions: {}", e))?;
        
        permissions.read_users.clear();
        permissions.write_users.clear();
        
        for perm_result in perm_rows {
            let (user_id, perm_type) = perm_result.map_err(|e| format!("Permission row error: {}", e))?;
            match perm_type.as_str() {
                "read" => permissions.read_users.push(user_id),
                "write" => permissions.write_users.push(user_id),
                _ => {},
            }
        }
        
        let mut pub_stmt = conn.prepare(
            "SELECT public_read, public_write FROM public_permissions WHERE path = ?1"
        ).map_err(|e| format!("Failed to prepare public permissions query: {}", e))?;
        
        if let Ok((public_read, public_write)) = pub_stmt.query_row([path], |row| {
            Ok((row.get::<_, bool>(0)?, row.get::<_, bool>(1)?))
        }) {
            permissions.public_read = public_read;
            permissions.public_write = public_write;
        }
        
        let mut node = FileNode {
            name: name.to_string(),
            file_type,
            content: if content.is_empty() { None } else { Some(content) },
            children: HashMap::new(),
            permissions,
            created_by,
            created_at,
            modified_at,
        };
        
        if node.file_type == FileType::Directory {
            let mut child_stmt = conn.prepare(
                "SELECT path, name FROM files WHERE path LIKE ?1 AND path != ?2 AND path NOT LIKE ?3"
            ).map_err(|e| format!("Failed to prepare children query: {}", e))?;
            
            let search_pattern = if path == "/" { "/%" } else { &format!("{}/%", path) };
            let deeper_pattern = if path == "/" { "/%/%" } else { &format!("{}/%/%", path) };
            
            let child_rows = child_stmt.query_map([search_pattern, path, deeper_pattern], |row| {
                Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
            }).map_err(|e| format!("Failed to query children: {}", e))?;
            
            for child_result in child_rows {
                let (child_path, child_name) = child_result.map_err(|e| format!("Child row error: {}", e))?;
                if let Some(child_node) = Self::load_node_recursive(conn, &child_path, &child_name)? {
                    node.children.insert(child_name.to_string(), child_node);
                }
            }
        }
        
        Ok(Some(node))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_filesystem_creation() {
        let fs = FileSystem::new("zs1owner123".to_string());
        assert_eq!(fs.root.name, "/");
        assert_eq!(fs.root.file_type, FileType::Directory);
    }
    
    #[test]
    fn test_directory_creation() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        let result = fs.create_directory("/home", "zs1owner123".to_string());
        assert!(result.is_ok());
        
        let home_dir = fs.resolve_path("/home");
        assert!(home_dir.is_some());
        assert_eq!(home_dir.unwrap().file_type, FileType::Directory);
    }
    
    #[test]
    fn test_file_creation() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        fs.create_directory("/home", "zs1owner123".to_string()).unwrap();
        let result = fs.create_file("/home/readme.txt", "Hello World!".to_string(), "zs1owner123".to_string());
        assert!(result.is_ok());
        
        let file = fs.resolve_path("/home/readme.txt");
        assert!(file.is_some());
        assert_eq!(file.unwrap().content, Some("Hello World!".to_string()));
    }
    
    #[test]
    fn test_permissions() {
        let perms = Permissions::new("zs1owner123".to_string());
        
        assert!(perms.can_read("zs1owner123"));
        assert!(perms.can_write("zs1owner123"));
        assert!(perms.can_read("zs1other456"));
        assert!(!perms.can_write("zs1other456"));
    }
    
    #[test]
    fn test_directory_listing() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        fs.create_directory("/home", "zs1owner123".to_string()).unwrap();
        fs.create_file("/home/file1.txt", "content1".to_string(), "zs1owner123".to_string()).unwrap();
        fs.create_file("/home/file2.txt", "content2".to_string(), "zs1owner123".to_string()).unwrap();
        
        let home_dir = fs.resolve_path("/home").unwrap();
        let listing = home_dir.list_children();
        
        assert_eq!(listing, vec!["file1.txt", "file2.txt"]);
    }

    #[test]
    fn test_file_removal() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        fs.create_directory("/home", "zs1owner123".to_string()).unwrap();
        fs.create_file("/home/temp.txt", "temporary".to_string(), "zs1owner123".to_string()).unwrap();
        
        assert!(fs.resolve_path("/home/temp.txt").is_some());
        
        let result = fs.remove("/home/temp.txt", "zs1owner123");
        assert!(result.is_ok());
        assert!(fs.resolve_path("/home/temp.txt").is_none());
    }
    
    #[test]
    fn test_directory_removal() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        fs.create_directory("/temp_dir", "zs1owner123".to_string()).unwrap();
        
        assert!(fs.resolve_path("/temp_dir").is_some());
        
        let result = fs.remove("/temp_dir", "zs1owner123");
        assert!(result.is_ok());
        assert!(fs.resolve_path("/temp_dir").is_none());
    }
    
    #[test]
    fn test_remove_permission_denied() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        fs.create_file("/protected.txt", "secret".to_string(), "zs1owner123".to_string()).unwrap();
        
        let result = fs.remove("/protected.txt", "zs1other456");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Permission denied"));
    }
    
    #[test]
    fn test_remove_root_denied() {
        let mut fs = FileSystem::new("zs1owner123".to_string());
        
        let result = fs.remove("/", "zs1owner123");
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Cannot remove root directory"));
    }

}