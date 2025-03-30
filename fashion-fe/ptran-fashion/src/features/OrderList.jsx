import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Paper
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Cancel,
  ArrowForward
} from '@mui/icons-material';

const OrderList = ({ orders, onOrderClick }) => {
  const primaryColor = '#005244';
  const lightPrimary = '#e0f2f1';

  const getStatusIcon = (status) => {
    switch(status) {
      case 'SHIPPED':
        return <LocalShipping fontSize="small" />;
      case 'DELIVERED':
        return <CheckCircle fontSize="small" color="success" />;
      case 'CANCELLED':
        return <Cancel fontSize="small" color="error" />;
      default:
        return <ArrowForward fontSize="small" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 3, 
      borderRadius: 2,
      border: `1px solid ${lightPrimary}`
    }}>
      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: primaryColor
      }}>
        All orders
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        from anytime
      </Typography>

      <List sx={{ mt: 2 }}>
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <ListItem 
              alignItems="flex-start" 
              sx={{ py: 3, cursor: 'pointer' }}
              onClick={() => onOrderClick(order)}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip
                      label={order.status}
                      size="small"
                      icon={getStatusIcon(order.status)}
                      sx={{
                        mr: 2,
                        backgroundColor: order.status === 'SHIPPED' ? lightPrimary : 
                                        order.status === 'DELIVERED' ? '#e8f5e9' : 
                                        order.status === 'CANCELLED' ? '#ffebee' : '#fff3e0',
                        color: order.status === 'SHIPPED' ? primaryColor : 
                              order.status === 'DELIVERED' ? '#2e7d32' : 
                              order.status === 'CANCELLED' ? '#c62828' : '#e65100',
                        fontWeight: 'bold',
                        border: order.status === 'SHIPPED' ? `1px solid ${primaryColor}` : 
                                order.status === 'DELIVERED' ? '1px solid #81c784' : 
                                order.status === 'CANCELLED' ? '1px solid #ffcdd2' : '1px solid #ffcc80'
                      }}
                    />
                    {order.status !== 'PENDING' && (
                      <Typography variant="body2">{order.arrival}</Typography>
                    )}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle1" component="div" sx={{ 
                      fontWeight: 'bold',
                      color: primaryColor
                    }}>
                      {order.merchant}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
                      {order.product}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      size: {order.size}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider component="li" sx={{ borderColor: lightPrimary }} />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default OrderList;