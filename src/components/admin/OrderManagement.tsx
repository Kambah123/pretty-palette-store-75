
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Package } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
  items: number;
}

interface OrderManagementProps {
  orders: Order[];
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'delivered':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} status to ${newStatus}`);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
            <CardDescription>Detailed information for this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <p>Name: {selectedOrder.customer}</p>
                <p>Email: customer@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <p>Items: {selectedOrder.items}</p>
                <p>Total: ${selectedOrder.total.toFixed(2)}</p>
                <p>Status: {selectedOrder.status}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Wireless Headphones</span>
                  <span>$99.99</span>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span>Phone Case</span>
                  <span>$24.99</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
