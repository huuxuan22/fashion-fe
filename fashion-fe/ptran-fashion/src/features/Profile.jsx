import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Avatar,
  Grid,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const primaryColor = '#005244';
  const lightPrimary = '#e0f2f1';

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 2,
        border: `1px solid ${lightPrimary}`
      }}>
        {/* Header */}
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          color: primaryColor,
          mb: 1
        }}>
          Hồ Sơ Của Tôi
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>

        <Grid container spacing={3}>
          {/* Left Column - Avatar */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: primaryColor,
                mb: 1.5,
                fontSize: '2rem'
              }}>
                H
              </Avatar>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  color: primaryColor,
                  borderColor: primaryColor,
                  mb: 1,
                  fontSize: '0.75rem'
                }}
              >
                CHỌN ẢNH
              </Button>
              <Typography variant="caption" color="text.secondary" align="center">
                Dụng lượng file tối đa 1 MB<br />
                Định dạng: JPEG, PNG
              </Typography>
            </Box>
          </Grid>

          {/* Right Column - Form */}
          <Grid item xs={12} sm={8}>
            {/* Username */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Tên đăng nhập
              </Typography>
              <TextField
                value="huxuntmdng319"
                fullWidth
                size="small"
                disabled
                sx={{ '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' } }}
                helperText="Tên Đăng nhập chỉ có thể thay đổi một lần."
                FormHelperTextProps={{ sx: { fontSize: '0.7rem', mt: 0.5 } }}
              />
            </Box>

            {/* Name */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Tên
              </Typography>
              <TextField
                placeholder="Nhập tên của bạn"
                fullWidth
                size="small"
                sx={{ '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' } }}
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Email
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value="***********@gmail.com"
                  fullWidth
                  size="small"
                  disabled
                  sx={{ 
                    mr: 1,
                    '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' }
                  }}
                />
                <Button 
                  endIcon={<EditIcon fontSize="small" />}
                  sx={{ 
                    color: primaryColor,
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    minWidth: 'auto',
                    p: '6px 8px'
                  }}
                >
                  THAY ĐỔI
                </Button>
              </Box>
            </Box>

            {/* Phone */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Số điện thoại
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value="********56"
                  fullWidth
                  size="small"
                  disabled
                  sx={{ 
                    mr: 1,
                    '& .MuiInputBase-input': { py: 1, fontSize: '0.875rem' }
                  }}
                />
                <Button 
                  endIcon={<EditIcon fontSize="small" />}
                  sx={{ 
                    color: primaryColor,
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    minWidth: 'auto',
                    p: '6px 8px'
                  }}
                >
                  THAY ĐỔI
                </Button>
              </Box>
            </Box>

            {/* Gender */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Giới tính
              </Typography>
              <FormControl>
                <RadioGroup row sx={{ mt: 0.5 }}>
                  <FormControlLabel 
                    value="male" 
                    control={<Radio size="small" sx={{ color: primaryColor }} />} 
                    label={<Typography variant="body2">Nam</Typography>} 
                    sx={{ mr: 1 }}
                  />
                  <FormControlLabel 
                    value="female" 
                    control={<Radio size="small" sx={{ color: primaryColor }} />} 
                    label={<Typography variant="body2">Nữ</Typography>} 
                    sx={{ mr: 1 }}
                  />
                  <FormControlLabel 
                    value="other" 
                    control={<Radio size="small" sx={{ color: primaryColor }} />} 
                    label={<Typography variant="body2">Khác</Typography>} 
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Birthday */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ mb: 0.5, color: primaryColor, fontWeight: 'bold' }}>
                Ngày sinh
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <TextField
                  select
                  size="small"
                  SelectProps={{ native: true }}
                  sx={{ flex: 1, '& .MuiSelect-select': { py: 1, fontSize: '0.875rem' } }}
                >
                  {['Ngày', ...Array.from({length: 31}, (_, i) => i + 1)].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </TextField>
                <TextField
                  select
                  size="small"
                  SelectProps={{ native: true }}
                  sx={{ flex: 1, '& .MuiSelect-select': { py: 1, fontSize: '0.875rem' } }}
                >
                  {['Tháng', ...Array.from({length: 12}, (_, i) => i + 1)].map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </TextField>
                <TextField
                  select
                  size="small"
                  SelectProps={{ native: true }}
                  sx={{ flex: 1, '& .MuiSelect-select': { py: 1, fontSize: '0.875rem' } }}
                >
                  {['Năm', ...Array.from({length: 100}, (_, i) => 2023 - i)].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </TextField>
              </Box>
            </Box>

            {/* Save Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: primaryColor,
                '&:hover': { backgroundColor: '#003d33' },
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              LƯU
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;