import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { HotelServiceEntity } from '../../common/entities/hotel-service.entity';
import { Repository } from 'typeorm';
import { CreateHotelServiceDto } from './dto/create-hotel-service.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { SERVER_URL } from '../../../config/common.config';
import { ChangeFoodDto } from "../foods/dto/change-food.dto";
import { ChangeHotelServiceDto } from "./dto/change-hotel-service.dto";

@Injectable()
export class HotelServicesService {
  constructor(
    @InjectRepository(HotelServiceEntity) private readonly hotelServiceRepo: Repository<HotelServiceEntity>,
  ) {}

  async getAllHotelServices() {
    return await this.hotelServiceRepo.find({ relations: ['category'] });
  }

  async createHotelService(image: Express.Multer.File, createHsService: CreateHotelServiceDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    createHsService.is_available = createHsService.is_available !== 'false';
    const hs = this.hotelServiceRepo.create({ ...createHsService, image_url: pathToImage });
    const { id } = await this.hotelServiceRepo.save(hs);
    return await this.hotelServiceRepo
      .createQueryBuilder('hs')
      .leftJoinAndSelect('hs.category', 'category')
      .where('hs.id = :hsId', { hsId: id })
      .getOne();
  }

  async changeHs(id: string, image: Express.Multer.File, changeHsDto: ChangeHotelServiceDto, savedImgFolder: string) {
    const hs = await this.hotelServiceRepo.findOne(id);
    if (!hs) throw new HttpException('Сервис с таким ID не существует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      hs.image_url = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeHsDto).forEach((key: string) => {
      if (key === 'is_available') changeHsDto.is_available = changeHsDto.is_available !== 'false';
      hs[key] = changeHsDto[key];
    });

    const savedHs = await this.hotelServiceRepo.save(hs);
    return await this.hotelServiceRepo
      .createQueryBuilder('hs')
      .leftJoinAndSelect('hs.category', 'category')
      .where('hs.id = :hsId', { hsId: savedHs.id })
      .getOne();
  }

  async deleteHs(id: string) {
    await this.hotelServiceRepo.delete(id);
    return true;
  }
}
