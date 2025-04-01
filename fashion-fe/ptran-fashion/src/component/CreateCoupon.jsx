import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const CreateCoupon = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      couponCode: "",
      startDate: null,
      endDate: null,
      minOrderValue: "",
      discountPercentage: "",
      status: "Active",
    },
  });

  const onSubmit = (data) => {
    console.log("Coupon Created:", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 7, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{ p: 3, border: "1px solid #008772", borderRadius: "8px", maxWidth: 850 }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ mb: 2, color: "#008772", fontWeight: "bold", textAlign: "center" }}
          >
            Create Coupon Code
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="couponCode"
                  control={control}
                  rules={{ required: "Coupon code is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Coupon Code"
                      variant="outlined"
                      error={!!errors.couponCode}
                      helperText={errors.couponCode?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
                      {...field}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="End Date"
                      {...field}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="minOrderValue"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Min Order Value"
                      type="number"
                      variant="outlined"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="discountPercentage"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Discount %"
                      type="number"
                      variant="outlined"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Status">
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#008772",
                    "&:hover": {
                      backgroundColor: "#00695f",
                    },
                    py: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  CREATE COUPON
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateCoupon;