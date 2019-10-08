import { Router, Get, Post, Query } from '../decorators';

@Router()
class Index {
    @Get('/')
    index(@Query('b') b: string, @Query('a') a: string) {
        return 'hello world ' + a + ' ' + b;
    }
}

export default Index;
