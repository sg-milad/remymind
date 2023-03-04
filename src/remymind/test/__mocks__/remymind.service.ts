import { remymindStub } from "../stubs/remymind.stubs";

export const RemymindService =jest.fn().mockReturnValue({
    createReminder: jest.fn().mockResolvedValue(remymindStub),
    getAllReminder:jest.fn().mockResolvedValue(remymindStub),
    getReminder: jest.fn().mockResolvedValue(remymindStub),
    updateReminder:jest.fn().mockResolvedValue(remymindStub),
    deleteReminder:jest.fn().mockResolvedValue(remymindStub),
})