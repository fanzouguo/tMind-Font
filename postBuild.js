const fs = require('fs-extra');
const path = require('path');
const { dist, sync } = require('./conf/index');

const DIST_DIR_ROOT = path.resolve(__dirname, dist);
const _getDist = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(DIST_DIR_ROOT, (err, data) => {
			if (err) {
				reject('生成文件夹读取失败');
			} else {
				resolve(data);
			}
		});
	})
};

const postExec = async () => {
	try {
		const _arr = await _getDist();
		console.log(_arr);
		console.log(sync);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

postExec();
