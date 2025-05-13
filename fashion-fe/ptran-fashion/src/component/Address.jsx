import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import * as userService from "./../service/user-service";
import SuccessNotification from "./SuccessNotification";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [homeAddress, setHomeAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [openUpdate,setOpenUpdate] = useState(false);
  const [openDelete,setOpenDelete] = useState(false);
  const [userAddressId,setUserAddressId] = useState(null);
  const onClose = () => {
    setOpen(false);
  };
  const onCloseUpdate = () => {
    setOpenUpdate(false);
  }
  const onCloseDelete = () => {
    setOpenDelete(false);
  }
  // Load provinces
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
    loadData();
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince?.code) {
      fetch(
        `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
      )
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts))
        .catch((error) => console.error("Error fetching districts:", error));
      setSelectedDistrict(null);
      setWards([]);
    }
  }, [selectedProvince]);

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict?.code) {
      fetch(
        `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
      )
        .then((res) => res.json())
        .then((data) => setWards(data.wards))
        .catch((error) => console.error("Error fetching wards:", error));
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  const loadData = async () => {
    try {
      const response = await userService.getAllAddressUser(token);
      setSavedAddresses(response.data);
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setHomeAddress("");
    setPhone("");
    setIsDefault(false);
    setOpenDialog(true);
  };

  const handleEditAddress = (address) => {
    console.log("dữ liệu: ",address);
    
    setUserAddressId(address.addressUserId)
    setEditingAddress(address);
    setSelectedProvince({
      code: address.province.code,
      name: address.province.name,
    });
    setSelectedDistrict({
      code: address.district.code,
      name: address.district.name,
    });
    setSelectedWard({
      code: address.commune.code,
      name: address.commune.name,
    });
    setHomeAddress(address.homeAddress);
    setPhone(address.phone);
    setIsDefault(address.isDefault);
    setOpenDialog(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await userService.deleteAddress(token, addressId);
      setOpenDelete(true);
      loadData();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSubmit = async () => {
    const addressData = {
      province: { code: selectedProvince.code, name: selectedProvince.name },
      district: { code: selectedDistrict.code, name: selectedDistrict.name },
      commune: { code: selectedDistrict.code, name: selectedDistrict.name },
      homeAddress,
      phone,
    };

    console.log("Address data to submit:", addressData);

    try {
      if (editingAddress) {
        const data = { ...addressData,addressUserId: userAddressId };
        console.log("dữ liệu cập nhật: ", data);
        
        await userService.updateAddress(
          token,
          data
        );
        setOpenUpdate(true)
        setUserAddressId("");
      } else {
        console.log("đã vào đây");
        await userService.addNewAddress(token, addressData);
        setOpen(true);
      }
      loadData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const setAsDefaultAddress = async (addressId) => {
    try {
      // await userService.setDefaultAddressUser(token, addressId);
      loadData();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#005244" }}>
          Địa chỉ của tôi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#005244",
            "&:hover": { backgroundColor: "#003d33" },
          }}
          onClick={handleAddAddress}
        >
          Thêm địa chỉ
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        {savedAddresses.map((address) => (
          <Grid item xs={12} key={address.addressUserId}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                border: address.isDefault
                  ? "2px solid #005244"
                  : "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: address.isDefault ? "#f0f9f8" : "#ffffff",
                position: "relative",
              }}
            >
              {address.isDefault && (
                <Chip
                  label="Mặc định"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#005244",
                    color: "white",
                  }}
                />
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {address.user.fullName} | {address.phone}
                  </Typography>
                  <Typography variant="body1" sx={{ my: 1 }}>
                    {address.homeAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.commune.name}, {address.district.name},{" "}
                    {address.province.name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <IconButton
                    onClick={() => handleEditAddress(address)}
                    sx={{ color: "#005244" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteAddress(address.addressUserId)}
                    sx={{ color: "#d32f2f" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Address Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Tỉnh/Thành phố</InputLabel>
                <Select
                  label="Tỉnh/Thành phố"
                  value={
                    selectedProvince ? JSON.stringify(selectedProvince) : ""
                  }
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    setSelectedProvince(selected);
                  }}
                  renderValue={(selected) => {
                    const province = JSON.parse(selected);
                    return province?.name || "";
                  }}
                >
                  {provinces.map((province) => (
                    <MenuItem
                      key={province.code}
                      value={JSON.stringify(province)}
                    >
                      {province.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Quận/Huyện</InputLabel>
                <Select
                  label="Quận/Huyện"
                  value={
                    selectedDistrict ? JSON.stringify(selectedDistrict) : ""
                  }
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    setSelectedDistrict(selected);
                  }}
                  disabled={!selectedProvince}
                  renderValue={(selected) => {
                    const district = JSON.parse(selected);
                    return district?.name || "";
                  }}
                >
                  {districts.map((district) => (
                    <MenuItem
                      key={district.code}
                      value={JSON.stringify(district)}
                    >
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Phường/Xã</InputLabel>
                <Select
                  label="Phường/Xã"
                  value={selectedWard ? JSON.stringify(selectedWard) : ""}
                  onChange={(e) => {
                    const selected = JSON.parse(e.target.value);
                    setSelectedWard(selected);
                  }}
                  disabled={!selectedDistrict}
                  renderValue={(selected) => {
                    const ward = JSON.parse(selected);
                    return ward?.name || "";
                  }}
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward.code} value={JSON.stringify(ward)}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ cụ thể"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    color="primary"
                  />
                }
                label="Đặt làm địa chỉ mặc định"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#005244",
              "&:hover": { backgroundColor: "#003d33" },
            }}
            disabled={
              !selectedProvince ||
              !selectedDistrict ||
              !selectedWard ||
              !homeAddress ||
              !phone
            }
          >
            {editingAddress ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </Dialog>
      {open && (
        <SuccessNotification
          open={open}
          onClose={onClose}
          message={"Thêm địa chỉ mới thành công"}
        />
      )}

      {openUpdate && (<SuccessNotification 
        open = {openUpdate}
        onClose = {onCloseUpdate}
        message={"Cập nhật thành công"}
      />)}

      {openDelete && (<SuccessNotification 
        open = {openDelete}
        onClose = {onCloseDelete}
        message={"Đã xóa 1 địa chỉ"}
      />)}
    </Paper>
  );
};

export default Address;
