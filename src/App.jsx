import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    photo: "",
  });
  const [userName, setUserName] = useState("");
  const debouncedUserName = useDebounce(userName, 500); // Debounce input

  useEffect(() => {
    if (debouncedUserName) {
      axios
        .get(`https://api.github.com/users/${debouncedUserName}`)
        .then((res) => {
          const { name, avatar_url } = res.data;
          setUserInfo({
            name: name || "No name",
            photo: avatar_url || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setUserInfo({
            name: "User not found",
            photo: "",
          });
        });
    } else {
      // Clear user info if input is empty
      setUserInfo({
        name: "",
        photo: "",
      });
    }
  }, [debouncedUserName]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-green-400">Get Users by Name</h3>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter GitHub username"
          />
          {userInfo.name && (
            <div className="flex items-center">
              <img src={userInfo.photo} alt={userInfo.name} className="w-10 h-10 rounded-full mr-2" />
              <p className="text-lg font-semibold">{userInfo.name}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
