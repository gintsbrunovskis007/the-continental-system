import { Injectable, NotFoundException } from "@nestjs/common";
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

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.hotelRepository.findOne({ where: { id } });

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }

    if (updateHotelDto.name !== undefined) {
      hotel.name = updateHotelDto.name;
    }

    if (updateHotelDto.country !== undefined) {
      hotel.country = updateHotelDto.country;
    }

    if (updateHotelDto.city !== undefined) {
      hotel.city = updateHotelDto.city;
    }

    if (updateHotelDto.address !== undefined) {
      hotel.address = updateHotelDto.address;
    }

    if (updateHotelDto.email !== undefined) {
      hotel.email = updateHotelDto.email;
    }

    if (updateHotelDto.phoneNumber !== undefined) {
      hotel.phone_number = updateHotelDto.phoneNumber;
    }

    const savedHotel = await this.hotelRepository.save(hotel);

    return savedHotel;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
