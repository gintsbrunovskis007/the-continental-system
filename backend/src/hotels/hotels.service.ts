import { Injectable } from "@nestjs/common";
import { CreateHotelDto } from "./dto/create-hotel.dto.js";
import { UpdateHotelDto } from "./dto/update-hotel.dto.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hotel } from "./entities/hotel.entity.js";

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelRepository.create({
      name: createHotelDto.name,
      country: createHotelDto.country,
      city: createHotelDto.city,
      address: createHotelDto.address,
      email: createHotelDto.email,
      phone_number: createHotelDto.phoneNumber,
    });

    const savedHotel = await this.hotelRepository.save(hotel);

    return savedHotel;
  }

  findAll() {
    return `This action returns all hotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
