import { MockService } from '../../common/mock.type';
import { WorldcupService } from '@src/modules/worldcup/worldcup.service';

export const mockWorldcupService: MockService<WorldcupService> = {
	getWorldcups: jest.fn(() => {}),
	getWorldcupsByWithWho: jest.fn(() => {}),
	getPopularWorldcup: jest.fn(() => {}),
	getWorldcupById: jest.fn(() => {}),
	getWorldcupItemById: jest.fn(() => {}),
	submitWoldcupResult: jest.fn(() => {}),
	getParticipatedWorldcup: jest.fn(() => {}),
};
