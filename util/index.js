// @ts-nocheck
// 参考：https://segmentfault.com/a/1190000016462275
const svgtofont = require('svgtofont');
const path = require('path');
const fs = require('fs-extra');
const def = require('../conf');
const pkg = require('../package.json');

const _basePath = process.cwd();
const _sourcePath = path.resolve(_basePath, def.source);
const _distPath = path.resolve(_basePath, def.dist);
const _pagePath = path.resolve(_basePath, 'view', 'demo.ejs');

let getTaskList = async () => {
	let _resArr = await fs.readdir(def.source, {
		encoding: 'utf-8'
	});
	let _arrExcept = def.except;
	return _resArr.filter(v => {
		return !_arrExcept.includes(v);
	});
};

let _execTask = async prefix => {
	try {
		if (prefix) {
			let _sPath = path.resolve(_sourcePath, prefix);
			let _dPath = path.resolve(_distPath, prefix);
			fs.emptyDirSync(_dPath);
			await svgtofont({
				// svg 图标目录路径
				src: _sPath,
				// 输出到指定目录中
				dist: _dPath,
				// 设置字体名称
				fontName: prefix,
				// 生成字体文件
				css: true,
				// unicode起始编号
				startNumber: 20000,
				svgicons2svgfont: {
					fontHeight: 1000,
					normalize: true
				},
				// 演示html文件
				// website = null,
				website: {
					title: 'icon',
					logo: '',
					version: pkg.version,
					meta: {
						description: '',
						keywords: ''
					},
					description: '',
					template: _pagePath,
					links: [
						{
							title: 'Font Class',
							url: 'index.html'
						},
						{
							title: 'Unicode',
							url: 'unicode.html'
						}
					],
					footerInfo: ''
				}
			});
		} else {
			throw new Error('前缀不能为空');
		}
	} catch (err) {
		throw err;
	}
}

module.exports = async () => {
	try {
		let _arr = await getTaskList();
		if (_arr.length) {
			await Promise.all(_arr.map(v => {
				return _execTask(v);
			}));
			console.log('Done!');
		} else {
			throw new Error('未找到任何SVG的源文件');
		}
	} catch (err) {
		throw err;
	}
};
