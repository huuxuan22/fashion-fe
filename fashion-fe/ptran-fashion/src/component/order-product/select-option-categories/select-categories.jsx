import React, { useState } from "react";
import "./select-categories.css";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

const SelectCategories = () => {
  const handleSubmit = () => {};
  return (
    <div className="select-categories">
      <div className="row">
        <div className="col-11">
          <div className="row item-select-categories">
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="col-lg-2">
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={10}
                    labelId="named-select"
                    id="demo-select"
                    name="demo-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategories;
