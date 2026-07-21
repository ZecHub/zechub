import { useState, useEffect } from "react";
import {
  Block,
  BlockTitle,
  List,
  ListItem,
  Chip,
  Badge,
  Card,
} from "konsta/react";
import { invoke, ListItem as ListItemType } from "../backend";

export default function ListsPage() {
  const [items, setItems] = useState<ListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await invoke<ListItemType[]>("get_list_items");
        setItems(data);
      } catch {
        setItems([
          { id: 1, title: "Fallback Item 1", description: "No Rust backend", category: "fallback" },
          { id: 2, title: "Fallback Item 2", description: "Run with Tauri for real data", category: "fallback" },
        ]);
      }
      setLoading(false);
    })();
  }, []);

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <>
      <BlockTitle>Rust-Sourced List</BlockTitle>
      <Block>
        <p className="text-sm text-gray-500">
          This list is populated via <code>invoke("get_list_items")</code> from Rust.
          {loading && " Loading..."}
        </p>
      </Block>

      {categories.map((cat) => (
        <div key={cat}>
          <BlockTitle>{cat.charAt(0).toUpperCase() + cat.slice(1)}</BlockTitle>
          <List>
            {items
              .filter((i) => i.category === cat)
              .map((item) => (
                <ListItem
                  key={item.id}
                  title={item.title}
                  after={<Badge>{item.id}</Badge>}
                  subtitle={item.description}
                />
              ))}
          </List>
        </div>
      ))}

      <BlockTitle>Chips</BlockTitle>
      <Block strong>
        <div className="flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip outline>Outline</Chip>
          <Chip deleteButton onDelete={() => { }}>Deleted</Chip>
          <Chip media={<img src="https://picsum.photos/24/24" alt="" className="w-6 h-6 rounded-full" />}>
            Media
          </Chip>
        </div>
      </Block>

      <BlockTitle>Cards</BlockTitle>
      <Block strong>
        <Card header="Card Header" footer="Card Footer">
          <p>This is a Konsta UI Card component with header and footer.</p>
        </Card>
        <Card outline>
          <p>An outline card with no header/footer.</p>
        </Card>
      </Block>
    </>
  );
}
