import {Test} from "@nestjs/testing"
import { RemymindController } from "../remymind.controller"
import { RemymindService } from "../remymind.service"

jest.mock("../remymind.service")

describe("RemymindController",()=>{
    beforeEach(async ()=>{
        const moduleRef = await Test.createTestingModule({
            imports:[],
            providers:[RemymindService],
            controllers:[RemymindController]
        }).compile()
    })
})