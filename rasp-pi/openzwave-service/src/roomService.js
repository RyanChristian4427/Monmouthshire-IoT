import logger from '../util/logger.js';
import RoomRepository from '../database/roomRepository';
import AppDAO from '../database/appDao';
import { postNewRoom } from '../client';

class RoomService {

    roomRepository;

    constructor() {
        const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
        this.roomRepository = new RoomRepository(appDao);
    }

    createTable() {
        return this.roomRepository.createTable();
    }

    create(room) {
        this.roomRepository.create(room);
    }

    updateRoom(roomId, type, name) {
        return this.roomRepository.updateRoom(roomId, type, name);
    }

    getAll() {
        return this.roomRepository.getAll();
    }

    getById(roomId){
        return this.roomRepository.getById(roomId);
    }

}

export default RoomService;

