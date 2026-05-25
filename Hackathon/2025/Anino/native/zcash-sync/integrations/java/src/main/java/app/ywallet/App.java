package app.ywallet;

import java.sql.*;

/**
 */
public class App 
{
    static {
        System.loadLibrary("java_warp");
    }

    public static void main( String[] args ) throws Exception
    {
        Class.forName("org.sqlite.JDBC");
        final App app = new App();

        // Create a new account
        final int id = app.newAccount();

        // Connect to the database via JDBC
        Connection conn = DriverManager.getConnection("jdbc:sqlite:zec.db");

        // Query the seed and address of the account by id
        String query = "SELECT seed, address FROM accounts WHERE id_account = ?";
        PreparedStatement statement = conn.prepareStatement(query);
        statement.setInt(1, id);
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            String seed = rs.getString(1);
            String address = rs.getString(2);

            System.out.println("seed phrase: " + seed + ", address: " + address);
        }
    }

    private native int newAccount();
}
