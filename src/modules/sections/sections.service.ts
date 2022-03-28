import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionEntity } from '../../common/entities/section.entity';
import { Repository } from 'typeorm';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { CreateSectionDto } from './dto/create-section.dto';
import { ChangeSectionDto } from './dto/change-section.dto';

@Injectable()
export class SectionsService {
  constructor(@InjectRepository(SectionEntity) private readonly sectionsRepo: Repository<SectionEntity>) {}

  async getAllSections() {
    return this.sectionsRepo.find();
  }

  async deleteSection(id: string) {
    await this.sectionsRepo.delete(id);
    return true;
  }

  async changeSection(
    id: string,
    image: Express.Multer.File,
    changeSectionDto: ChangeSectionDto,
    savedImgFolder: string,
  ) {
    const section = await this.sectionsRepo.findOne(id);
    if (!section) throw new HttpException('Секция с данным ID не существует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      section.image_url = `${savedImgFolder}/${image.filename}`;
    }

    Object.keys(changeSectionDto).forEach((key: string) => {
      section[key] = changeSectionDto[key];
    });

    return await this.sectionsRepo.save(section);
  }

  async createSection(image: Express.Multer.File, createSectionDto: CreateSectionDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${savedImgFolder}/${image.filename}`;
    const section = this.sectionsRepo.create({ ...createSectionDto, image_url: pathToImage });
    return await this.sectionsRepo.save(section);
  }
}
