import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private readonly SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

  connect() {
    if (!this.socket) {
      this.socket = io(this.SOCKET_URL, {
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  // User-specific methods
  joinUserRoom(userId: string) {
    if (this.socket) {
      this.socket.emit('join_user_room', userId);
    }
  }

  // Admin-specific methods
  joinAdminRoom() {
    if (this.socket) {
      this.socket.emit('join_admin_room');
    }
  }

  // Order tracking methods
  trackOrder(orderId: string) {
    if (this.socket) {
      this.socket.emit('track_order', orderId);
    }
  }

  untrackOrder(orderId: string) {
    if (this.socket) {
      this.socket.emit('untrack_order', orderId);
    }
  }

  // Event listeners
  onOrderUpdated(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('order_updated', callback);
    }
  }

  onOrderStatusChanged(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('order_status_changed', callback);
    }
  }

  onNewOrder(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('new_order', callback);
    }
  }

  onOrderStatusUpdated(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('order_status_updated', callback);
    }
  }

  // Remove event listeners
  offOrderUpdated() {
    if (this.socket) {
      this.socket.off('order_updated');
    }
  }

  offOrderStatusChanged() {
    if (this.socket) {
      this.socket.off('order_status_changed');
    }
  }

  offNewOrder() {
    if (this.socket) {
      this.socket.off('new_order');
    }
  }

  offOrderStatusUpdated() {
    if (this.socket) {
      this.socket.off('order_status_updated');
    }
  }
}

export default new SocketService();