const path = require('path');
const CODE_ROOT_PATH = path.resolve(__dirname, '..', '..', '..');
const getPath = (...dirs) => {
	let _arr = dirs;
	return path.resolve(CODE_ROOT_PATH, ..._arr);
};

module.exports = {
	// SVG源图文件夹名称
	source: 'source',
	// 图标字体发布路径
	dist: 'dist',
	// 要排除的源图文件夹
	except: ['tobeUse'],
	// 发布后，需要同步拷贝的目标路径
	sync: [
		getPath('code.smpoo', 'smpoo.inside', 'mpa', 'public', 'font'),
		getPath('code.smpoo', 'smpoo.inside', 'mpa', 'public', 'font')
	]
};
