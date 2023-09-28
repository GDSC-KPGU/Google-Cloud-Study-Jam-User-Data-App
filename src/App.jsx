
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./componets/Navbar";
import { useTable } from "react-table";
import axios from "axios"; // Import axios
import Confetti from 'react-confetti'; // Import the Confetti component


function App() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalStarted, setTotalStarted] = useState(0);
  const [totalReg, setTotalReg] = useState(0);

  // Function to fetch data from the backend
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get("https://study-jams-leaderboard.onrender.com/fetch-badges"); // Replace with your backend server URL
      const sortedData = response.data.Sheet1.sort((a, b) => {
        const totalA =
          parseInt(a["# of Courses Completed"]) +
          parseInt(a["# of GenAI Game Completed"]);
        const totalB =
          parseInt(b["# of Courses Completed"]) +
          parseInt(b["# of GenAI Game Completed"]);
        return totalB - totalA;
      });
      setData(sortedData); // Assuming the data is stored in a "Sheet1" property
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend(); // Fetch data when the component mounts
  }, []);

  const handleInputChange = (event) => {
    setFilter(event.target.value); // Update the search query state
  };

  const filteredData = data.filter((item) => {
    // Filter data based on the search query
    const studentName = item["Student Name"].toLowerCase();
    return studentName.includes(filter.toLowerCase());
  });
  const calculateTotalCompletion = () => {
    // Calculate the total completion count based on the "Total Completion" column
    const totalCompletionCount = data.reduce((count, item) => {
      const coursesCompleted = parseInt(item["# of Courses Completed"]);
      const genAIGameCompleted = parseInt(item["# of GenAI Game Completed"]);
      const shouldDisplayCheckmark = coursesCompleted === 8 && genAIGameCompleted === 1;
      
      return shouldDisplayCheckmark ? count + 1 : count;
    }, 0);
  
    return totalCompletionCount;
  };
  

  const totalCompletion = calculateTotalCompletion();
  const remainingCompletion = 40 - totalCompletion; // Calculate remaining completion
  const progressBarWidth = (totalCompletion / 40) * 100; // Calculate the width for the progress bar

  const columns = [
    {
      Header: "Sr. No.",
      accessor: (row, index) => index + 1,
    },
    {
      Header: "Name",
      accessor: "Student Name",
      Cell: (props) => (
        <a
          href={props.row.original["Google Cloud Skills Boost Profile URL"]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          {props.value}
        </a>
      ),
    },
{
  Header: "Redemption Status",
  accessor: (row) => {
    // Check if Redemption Status is already "Yes"
    if (row["Redemption Status"] === "Yes") {
      return "Yes";
    } else {
      // Check if GenAI Game Completed is 1
      return parseInt(row["# of GenAI Game Completed"]) === 1 ? "Yes" : "No";
    }
  },
  Cell: (props) =>
    props.value === "Yes" ? (
      <span role="img" aria-label="Yes">
        ✅
      </span>
    ) : (
      <span role="img" aria-label="No">
        ⚠️
      </span>
    ),
},


    {
      Header: "Course Completed",
      accessor: "# of Courses Completed",
    },
    {
      Header: "GenAI Completed",
      accessor: "# of GenAI Game Completed",
    },
    {
      Header: "Total Completion",
      accessor: "Total Completions of both Pathways",
      Cell: (props) => {
        const coursesCompleted = parseInt(props.row.original["# of Courses Completed"]);
        const genAIGameCompleted = parseInt(props.row.original["# of GenAI Game Completed"]);
  
        // Check if conditions are met for displaying a checkmark
        const shouldDisplayCheckmark = coursesCompleted === 8 && genAIGameCompleted === 1;
  
        return shouldDisplayCheckmark ? (
          <span role="img" aria-label="Yes">
            ✅
          </span>
        ) :(
          <span role="img" aria-label="No">
            ⚠️
          </span>
        ) // Return null if conditions are not met
      },
    },
  ];

  return (
    <>
    <Confetti // Add the Confetti component here
      width={window.innerWidth}
      height={window.innerHeight}
    />
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center my-5">
            <div className="relative mx-auto sm:w-3/4 mt-5">
              <input
                id="input"
                className="px-4 py-2 sm:w-60 md:w-1/2 lg:w-full xl:w-full text-black rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                type="text"
                id="gccp_search"
                value={filter}
                onChange={handleInputChange}
                placeholder="Search by Name"
              />
              <i className="absolute top-2 right-2 text-gray-400 fas fa-search"></i>
            </div>
          </div>
          <div className="overflow-x-auto">
          <div className="mb-4">
          <p className="text-center text-white py-4 text-2xl">
  🎉 Congratulations! {totalCompletion} have successfully Completed 🎉
</p>

  <div className="ml-44 relative">
    <div className="bg-red-500 h-8 rounded-full relative max-w-4xl">
      <div
        className="bg-green-500 h-8 rounded-full"
        style={{ width: `${progressBarWidth}%`, transition: "width 1s ease-in-out" }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-white">
          {progressBarWidth}%
        </span>
      </div>
    </div>
   
    <img className="absolute right-0 top-0   m h-32 w-32 mr-18 " style={{ top: "-64px" }} src="https://cdn-icons-png.flaticon.com/512/4033/4033298.png" alt="Prize" />
    <p className="text-center text-white ml-[900px] mt-12 ">T shirts and stickers(Swags)</p>
  </div>
  <p className="text-center text-white py-4 text-4xl">
  <mark class="px-2 text-white bg-red-600 rounded dark:bg-red-500 mr-4 ">{remainingCompletion}  </mark> completions are required to cross tier 3
  </p>
</div>







            <Table columns={columns} data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
}

const Table = ({ columns, data }) => {
  // Remove useSortBy to disable column sorting
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    }
  );

  return (
    <table {...getTableProps()} className="table-auto w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="px-4 py-2"
              >
                <div>
                  <b>{column.render("Header")}</b>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} id="gccp_body">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="px-10 py-2">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default App;
