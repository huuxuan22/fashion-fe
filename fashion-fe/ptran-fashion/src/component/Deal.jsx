import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  TablePagination 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DealCategory from "./DealCategory";
import CreateDeal from "./CreateDeal";

// Mock data
const deals = [
    { id: 1, image: "https://th.bing.com/th/id/OIP.WyFcM78sLzXh0erHo_JPFAHaHa?rs=1&pid=ImgDetMain", category: "women_skirts_palazzos", discount: "15%" },
    { id: 2, image: "https://th.bing.com/th/id/OIP.WyFcM78sLzXh0erHo_JPFAHaHa?rs=1&pid=ImgDetMain", category: "men_t_shirts", discount: "60%" },
    { id: 3, image: "https://th.bing.com/th/id/OIP.WyFcM78sLzXh0erHo_JPFAHaHa?rs=1&pid=ImgDetMain", category: "men_formal_shirts", discount: "40%" }
  ];


// Main Deal component
const Deal = () => {
    const [selectedTab, setSelectedTab] = useState("DEALS");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Render content based on selected tab
    const renderContent = () => {
      switch(selectedTab) {
        case "CATEGORIES":
          return <DealCategory />;
        case "CREATE_DEAL":
          return <CreateDeal />;
        case "DEALS":
        default:
          return (
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#008772" }}>
                  <TableRow>
                    <TableCell style={{ color: "#fff" }}>No</TableCell>
                    <TableCell style={{ color: "#fff" }}>Image</TableCell>
                    <TableCell style={{ color: "#fff" }}>Category</TableCell>
                    <TableCell style={{ color: "#fff" }}>Discount</TableCell>
                    <TableCell style={{ color: "#fff" }}>Edit</TableCell>
                    <TableCell style={{ color: "#fff" }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((deal, index) => (
                    <TableRow key={deal.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell><img src={deal.image} alt={deal.category} width={50} /></TableCell>
                      <TableCell>{deal.category}</TableCell>
                      <TableCell>{deal.discount}</TableCell>
                      <TableCell>
                        <IconButton color="primary"><Edit /></IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton color="error"><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={deals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          );
      }
    };
  
    return (
      <div style={{ padding: 20 }}>
        <h2>Quản lý Phần Giảm giá</h2>
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <button 
            style={{ 
              padding: 10, 
              border: "none", 
              background: selectedTab === "DEALS" ? "#E0F2F1" : "transparent", 
              color: selectedTab === "DEALS" ? "#008772" : "#666", 
              borderBottom: selectedTab === "DEALS" ? "3px solid #008772" : "none", 
              cursor: "pointer" 
            }}
            onClick={() => handleTabChange("DEALS")}
          >
            DEALS
          </button>
          <button 
            style={{ 
              padding: 10, 
              border: "none", 
              background: selectedTab === "CATEGORIES" ? "#E0F2F1" : "transparent", 
              color: selectedTab === "CATEGORIES" ? "#008772" : "#666", 
              borderBottom: selectedTab === "CATEGORIES" ? "3px solid #008772" : "none", 
              cursor: "pointer" 
            }}
            onClick={() => handleTabChange("CATEGORIES")}
          >
            CATEGORIES
          </button>
          <button 
            style={{ 
              padding: 10, 
              border: "none", 
              background: selectedTab === "CREATE_DEAL" ? "#E0F2F1" : "transparent", 
              color: selectedTab === "CREATE_DEAL" ? "#008772" : "#666", 
              borderBottom: selectedTab === "CREATE_DEAL" ? "3px solid #008772" : "none", 
              cursor: "pointer" 
            }}
            onClick={() => handleTabChange("CREATE_DEAL")}
          >
            CREATE DEAL
          </button>
        </div>
        
        {renderContent()}
      </div>
    );
  };
  
  export default Deal;