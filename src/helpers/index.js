class Helper {
	static getLatestStats(stats, cb) {
		let best = 0;
		for(let index in stats) {
			// Skip prototypes and such
			if (!stats.hasOwnProperty(index)) continue;

			// Because index is in UTC time, check for latest time (highest number)
			if (best <= index) {
				best = index;
			}
		}
		cb({ data: stats[best], done: true });
	};
	static convertToReadable(rate) {
		const HASHRATES = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];

		const getBaseLog = (x, y) => {
			return Math.log(y) / Math.log(x);
		}

		const convertHashrate = (hashrate) => {
			if (hashrate === 0) {
				return '0H/s'
			}

			const i = Math.floor(getBaseLog(1000, hashrate));
			const s = (hashrate / Math.pow(1000, i)).toFixed(2);
			return s + HASHRATES[i]
		}

		return convertHashrate(rate);
	};
}

export default Helper;