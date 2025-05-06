import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductDto, UpdateProductDto } from "./dto/product.dto";
import { Auth } from "../../common/decorators/auth.decorator";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    getAllProducts(@Query() paginationDto: PaginationDto) {
        return this.productService.getAllProducts(paginationDto)
    }

    @Get(':id')
    getProduct(@Param('id') id: number) {
        return this.productService.getProduct(id)
    }

    @Post()
    @Auth()
    addProduct(@Body() body: AddProductDto) {
        return this.productService.addProduct(body)
    }

    @Post(':id')
    @Auth()
    updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
        return this.productService.updateProduct(id, body)
    }

    @Delete(':id')
    @Auth()
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id)
    }
}