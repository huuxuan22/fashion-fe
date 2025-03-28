import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  SvgIcon,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const TikTokIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M12 2C13.66 2 15 3.34 15 5V7.75C16.4 8.6 17.94 9 19.5 9V12C17.66 12 16.12 11.56 15 10.75V16C15 19.32 12.32 22 9 22C5.68 22 3 19.32 3 16C3 12.68 5.68 10 9 10C9.4 10 9.8 10.06 10.18 10.14V13.12C9.88 13.04 9.6 13 9.28 13C7.6 13 6.26 14.34 6.26 16C6.26 17.66 7.6 19 9.28 19C10.94 19 12.28 17.66 12.28 16V2H12Z"
      fill="currentColor"
    />
  </SvgIcon>
);

const Footer = () => {
  const [emailContent, setEmailContent] = useState("");

  const handleSendEmail = () => {
    console.log("Email content:", emailContent);
    alert("Email sent successfully!");
  };

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#f5f5f5", padding: "40px", marginTop: "40px" ,marginTop: 'auto'}}
      
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            ABOUT
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <IconButton aria-label="Facebook" color="primary" href="#">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Instagram" color="secondary" href="#">
              <Instagram />
            </IconButton>
            <IconButton aria-label="Twitter" color="info" href="#">
              <Twitter />
            </IconButton>
            <IconButton aria-label="LinkedIn" color="primary" href="#">
              <LinkedIn />
            </IconButton>
            <IconButton aria-label="TikTok" href="#">
              <TikTokIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            CATEGORIES
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {[
              "Website Design",
              "UI Design",
              "Web Development",
              "Video Editor",
              "Theme Creator",
              "Templates",
            ].map((item) => (
              <li key={item}>
                <Link href="#" underline="hover" color="text.secondary">
                  {item}
                </Link>
              </li>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            QUICK LINKS
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
            {[
              "About Us",
              "Contact Us",
              "Contribute",
              "Privacy Policy",
              "Sitemap",
            ].map((item) => (
              <li key={item}>
                <Link href="#" underline="hover" color="text.secondary">
                  {item}
                </Link>
              </li>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            SEND US AN EMAIL
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your message here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{
              width: "100%",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#578E3C" },
                "&:hover fieldset": { borderColor: "#4C7A34" },
                "&.Mui-focused fieldset": { borderColor: "#578E3C" },
              },
              "& .MuiInputBase-input": {
                color: "#578E3C",
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#578E3C",
              "&:hover": { backgroundColor: "#466B2D" },
            }}
            onClick={handleSendEmail}
            fullWidth
          >
            Send Email
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright © 2020 All Rights Reserved by Code4Education.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
