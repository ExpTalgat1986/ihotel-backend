import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMulterOptions, SECTIONS_IMAGE_PATH } from '../../utils/file-upload.utils';
import { CreateSectionDto } from './dto/create-section.dto';
import { ChangeSectionDto } from './dto/change-section.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  getAllSections() {
    return this.sectionsService.getAllSections();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(SECTIONS_IMAGE_PATH)))
  createSection(@UploadedFile() file: Express.Multer.File, @Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.createSection(file, createSectionDto, SECTIONS_IMAGE_PATH);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', createMulterOptions(SECTIONS_IMAGE_PATH)))
  changeSection(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() changeSectionDto: ChangeSectionDto,
  ) {
    return this.sectionsService.changeSection(id, file, changeSectionDto, SECTIONS_IMAGE_PATH);
  }

  @Delete(':id')
  deleteSection(@Param('id') id: string) {
    return this.sectionsService.deleteSection(id);
  }
}
