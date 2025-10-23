import { ref, get, remove } from 'firebase/database';
import { database } from '../firebase';

/**
 * Clean up old/ended quiz rooms from the database
 * Removes rooms that have been ended for more than 24 hours
 */
export const cleanupOldRooms = async (): Promise<number> => {
  try {
    const roomsRef = ref(database, 'rooms');
    const snapshot = await get(roomsRef);
    
    if (!snapshot.exists()) {
      return 0;
    }

    const rooms = snapshot.val();
    const now = Date.now();
    const DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours
    let removedCount = 0;

    for (const roomId in rooms) {
      const room = rooms[roomId];
      
      // Remove if room is ended and has been inactive for > 24 hours
      if (room.status === 'ended') {
        // Use the room ID (timestamp) to determine age
        const roomAge = now - parseInt(roomId);
        
        if (roomAge > DAY_IN_MS) {
          await remove(ref(database, `rooms/${roomId}`));
          removedCount++;
          console.log(`Cleaned up old room: ${room.name} (${room.code})`);
        }
      }
    }

    return removedCount;
  } catch (error) {
    console.error('Error cleaning up old rooms:', error);
    return 0;
  }
};

/**
 * Get all active rooms for a specific admin (by checking creation time proximity)
 * This helps prevent admins from having multiple active rooms
 */
export const getActiveRoomsCount = async (): Promise<number> => {
  try {
    const roomsRef = ref(database, 'rooms');
    const snapshot = await get(roomsRef);
    
    if (!snapshot.exists()) {
      return 0;
    }

    const rooms = snapshot.val();
    let activeCount = 0;

    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room.status === 'waiting' || room.status === 'active') {
        activeCount++;
      }
    }

    return activeCount;
  } catch (error) {
    console.error('Error getting active rooms:', error);
    return 0;
  }
};

/**
 * Check if a room is still valid and active
 */
export const isRoomValid = (room: any): boolean => {
  if (!room) return false;
  
  // Room must not be ended
  if (room.status === 'ended') return false;
  
  // Room must have been created within last 24 hours
  const roomAge = Date.now() - parseInt(room.id);
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  
  if (roomAge > DAY_IN_MS) return false;
  
  return true;
};

