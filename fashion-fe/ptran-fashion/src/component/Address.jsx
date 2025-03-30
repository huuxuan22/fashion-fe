import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControl,
  InputLabel
} from "@mui/material";

const Address = () => {
    const [provinces] = useState(['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng']);
    const [districts] = useState(['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4']);
    const [wards] = useState(['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4']);
    const [savedAddresses] = useState([
      '123 Đường ABC, Phường 1, Quận 1, Hồ Chí Minh',
      '456 Đường XYZ, Phường 2, Quận 2, Hồ Chí Minh'
    ]);
  
    return (
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0f2f1' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#005244' }}>
          Địa chỉ của tôi
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Tỉnh/Thành phố</InputLabel>
              <Select label="Tỉnh/Thành phố">
                {provinces.map(province => (
                  <MenuItem key={province} value={province}>{province}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Quận/Huyện</InputLabel>
              <Select label="Quận/Huyện">
                {districts.map(district => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Phường/Xã</InputLabel>
              <Select label="Phường/Xã">
                {wards.map(ward => (
                  <MenuItem key={ward} value={ward}>{ward}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              placeholder="Địa chỉ cụ thể"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.875rem'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#005244',
                '&:hover': { backgroundColor: '#003d33' }
              }}
            >
              Lưu địa chỉ
            </Button>
          </Grid>
        </Grid>
  
        <Divider sx={{ my: 2 }} />
  
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Địa chỉ đã lưu
        </Typography>
        {savedAddresses.map((address, index) => (
          <Box key={index} sx={{ 
            p: 2, 
            mb: 2, 
            border: '1px solid #e0f2f1', 
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography>{address}</Typography>
            <Box>
              <Button size="small" sx={{ color: '#005244', mr: 1 }}>Sửa</Button>
              <Button size="small" sx={{ color: '#d32f2f' }}>Xóa</Button>
            </Box>
          </Box>
        ))}
      </Paper>
    );
}

export default Address