import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  TablePagination,
  Box
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DealCategory from "./DealCategory";
import CreateDeal from "./CreateDeal";
import * as adminService from "./../service/admin-service";
import SuccessNotification from "./SuccessNotification";

const Deal = () => {
    const [selectedTab, setSelectedTab] = useState("DEALS");
    const size = 4;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dealList, setDealList] = useState([]);
    const token = localStorage.getItem("token");
    const [totalPages, setTotalPages] = useState(0);
    const [openDelete,setOpenDelete] = useState(false);
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    const loadData = async () => {
      try {
        const dealsData = await adminService.getAllDEAL(size, page + 1, token);
        console.log("deals: ", dealsData.data);
        setDealList(dealsData.data);
        
        const pagesData = await adminService.getAllPageOfDeal(token);
        console.log("total ", pagesData.data);
        setTotalPages(pagesData.data);
      } catch (error) {
        console.error("Error loading deal data:", error);
      }
    };
    const onClose = () => {
      setOpenDelete(false)
    }
    useEffect(() => {
      loadData();
    }, [page]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const getDiscountDisplay = (deal) => {
      if (deal.dealType === 'DEAL PERCENT') {
        return `${deal.discountPercent}%`;
      } else if (deal.dealType === 'DEAL PRICE') {
        return `$${deal.dealPrice.toLocaleString()}`;
      }
      return "N/A";
    };

    const handleDelete =async (dealId) => {
        await adminService.deleteDeal(dealId,token).then(() => {
          loadData();
          setOpenDelete(true)
        })
    }

    // Render content based on selected tab
    const renderContent = () => {
      switch(selectedTab) {
        case "CATEGORIES":
          return <DealCategory />;
        case "CREATE_DEAL":
          return <CreateDeal onDealCreated={loadData} />;
        case "DEALS":
        default:
          return (
            <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
              <Table stickyHeader sx={{ minWidth: 650 }} size="medium">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#008772" }}>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '5%' }}>No</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '15%' }}>Deal Image</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '20%' }}>Product</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '15%' }}>Product Image</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '10%' }}>Deal Type</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '10%' }}>Discount</TableCell>
                    <TableCell sx={{ color: "#fff", fontSize: '1rem', fontWeight: 'bold', width: '10%' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dealList.map((deal, index) => (
                    <TableRow 
                      key={deal.dealId}
                      sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                        height: '120px' // Tăng chiều cao mỗi dòng
                      }}
                    >
                      <TableCell sx={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                        {index + 1 + (page * rowsPerPage)}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle' }}>
                        {deal?.imageUrl ? (
                          <Box
                            component="img"
                            src={"http://localhost:8080/image/deal/" + deal.imageUrl}
                            alt={deal.product?.productName || "Deal image"}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: 'cover',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          />
                        ) : (
                          <Box sx={{ 
                            width: 100, 
                            height: 100, 
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}>
                            No Image
                          </Box>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                        {deal.product?.productName || "N/A"}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle' }}>
                        {deal.product?.thumbnail ? (
                          <Box
                            component="img"
                            src={"http://localhost:8080/image/product/" + deal.product.thumbnail}
                            alt={deal.product?.productName || "Product image"}
                            sx={{
                              width: 100,
                              height: 100,
                              objectFit: 'cover',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          />
                        ) : (
                          <Box sx={{ 
                            width: 100, 
                            height: 100, 
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}>
                            No Image
                          </Box>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                        {deal.dealType}
                      </TableCell>
                      <TableCell sx={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                        <Box sx={{ 
                          fontWeight: 'bold',
                          color: deal.dealType === 'DEAL PERCENT' ? '#ff5722' : '#4caf50'
                        }}>
                          {getDiscountDisplay(deal)}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: 'middle' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            color="error" 
                            sx={{ 
                              backgroundColor: '#ffebee',
                              '&:hover': { backgroundColor: '#ffcdd2' }
                            }}
                          >
                            <Delete fontSize="medium" onClick= {() => {
                               handleDelete(deal.dealId)
                            }}/>
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalPages * rowsPerPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ borderTop: '1px solid #e0e0e0' }}
              />
            </TableContainer>
          );
      }
    };
  
    return (
      <Box sx={{ padding: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3
        }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#333' }}>Quản lý Phần Giảm giá</h2>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <button 
              style={{ 
                padding: '10px 20px', 
                border: "none", 
                background: selectedTab === "DEALS" ? "#008772" : "transparent", 
                color: selectedTab === "DEALS" ? "#fff" : "#666", 
                borderRadius: '4px',
                cursor: "pointer",
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleTabChange("DEALS")}
            >
              DEALS
            </button>
            <button 
              style={{ 
                padding: '10px 20px', 
                border: "none", 
                background: selectedTab === "CATEGORIES" ? "#008772" : "transparent", 
                color: selectedTab === "CATEGORIES" ? "#fff" : "#666", 
                borderRadius: '4px',
                cursor: "pointer",
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleTabChange("CATEGORIES")}
            >
              CATEGORIES
            </button>
            <button 
              style={{ 
                padding: '10px 20px', 
                border: "none", 
                background: selectedTab === "CREATE_DEAL" ? "#008772" : "transparent", 
                color: selectedTab === "CREATE_DEAL" ? "#fff" : "#666", 
                borderRadius: '4px',
                cursor: "pointer",
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleTabChange("CREATE_DEAL")}
            >
              CREATE DEAL
            </button>
          </Box>
        </Box>
        
        {renderContent()}


        {openDelete && (<SuccessNotification 
          open = {openDelete}
          onClose={onClose}
          message={"Bạn đã xóa thành công"}
        />)}
      </Box>
    );
};

export default Deal;