import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductDto, GetProductsDto, UpdateProductDto } from "./dto/product.dto";
import { Auth } from "../../common/decorators/auth.decorator";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    getAllProducts(@Query() query: GetProductsDto) {
        return this.productService.getAllProducts(query)
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