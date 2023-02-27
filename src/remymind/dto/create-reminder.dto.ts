import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatereMinder {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  img: string

  @IsString()
  @IsOptional()
  voice: string

  @IsBoolean()
  @IsOptional()
  favorite: boolean

  @IsNumber()
  @IsOptional()
  remindme: number
}
