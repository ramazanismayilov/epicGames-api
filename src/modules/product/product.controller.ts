import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { AddProductDto } from "./dto/product.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts()
    }

    @Get(':id')
    getProduct(@Param() id: number) {
        return this.productService.getProduct(id)
    }

    @Post()
    @Auth()
    addProduct(@Body() body: AddProductDto) {
        return this.productService.addProduct(body)
    }
}