define(function (require, exports, module) {
	
	var ztree=require("../widgets/ztree")
	 var datas=[{ id:1, pId:0, name:"时尚包袋",open:true,nocheck:true},
						{ id:11, pId:1, name:"单肩包", open:true,nocheck:true},
							{ id:111, pId:11, name:"双肩包",v:"id1",checked:true},
							{ id:112, pId:11, name:"手提包",v:"id2"},
							{ id:113, pId:11, name:"斜跨包",v:"id3"},
							{ id:114, pId:11, name:"单肩/斜跨",v:"id4"},
							{ id:115, pId:11, name:"手提/斜跨",v:"id5"},
					
						{ id:12, pId:1, name:"手包",nocheck:true},
							{ id:121, pId:12, name:"真皮女包",v:"id6"},
					
					{ id:2, pId:0, name:"精品男包",nocheck:true},
						{ id:21, pId:2, name:"精品男包",v:"id7"},
					{ id:3, pId:0, name:"潮流女包",nocheck:true},
						{ id:31, pId:3, name:"潮流女包",v:"id8"},
					{ id:4, pId:0, name:"商务出差",nocheck:true},
						{ id:41, pId:4, name:"商务出差",v:"id9"}
				]
	

	
	
	ztree.tree($("#treeDemo"),{zNodes:datas,hiddenID:"treeVal"})
})