"use client"
import { AdminNavbar } from "@/components/adminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get("http://localhost:8000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      await axios.delete(`http://localhost:8000/admin/removeUsers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <div>
          <h1 className="text-3xl font-bold mb-8">User List</h1>
          {loading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Created At</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="bg-white">
                      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="bg-red-500 text-white py-1 px-4 rounded"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

