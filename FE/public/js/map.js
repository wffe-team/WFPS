$(function() {
	var myChart = echarts.init(document.getElementById('china-map'));
        var backBtn = document.getElementById("backBtn");

        var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu',
            'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi',
            'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia',
            'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'
        ];

        var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北',
            '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '台湾',
            '香港', '澳门'
        ];

        var max = 480,
            min = 9; // todo 
        var maxSize4Pin = 100,
            minSize4Pin = 20;
        var seriesData = [{
            name: '北京',
            value: 177
        }, {
            name: '天津',
            value: 42
        }, {
            name: '上海',
            value: 102
        }, {
            name: '重庆',
            value: 81
        }, {
            name: '河北',
            value: 47
        }, {
            name: '河南',
            value: 67
        }, {
            name: '云南',
            value: 82
        }, {
            name: '辽宁',
            value: 66
        }, {
            name: '黑龙江',
            value: 66
        }, {
            name: '湖南',
            value: 24
        }, {
            name: '安徽',
            value: 92
        }, {
            name: '山东',
            value: 119
        }, {
            name: '新疆',
            value: 137
        }, {
            name: '江苏',
            value: 116
        }, {
            name: '浙江',
            value: 114
        }, {
            name: '江西',
            value: 91
        }, {
            name: '湖北',
            value: 125
        }, {
            name: '广西',
            value: 62
        }, {
            name: '甘肃',
            value: 83
        }, {
            name: '山西',
            value: 79
        }, {
            name: '内蒙古',
            value: 9
        }, {
            name: '陕西',
            value: 80
        }, {
            name: '吉林',
            value: 56
        }, {
            name: '福建',
            value: 10
        }, {
            name: '贵州',
            value: 18
        }, {
            name: '广东',
            value: 67
        }, {
            name: '青海',
            value: 123
        }, {
            name: '西藏',
            value: 59
        }, {
            name: '四川',
            value: 14
        }, {
            name: '宁夏',
            value: 54
        }, {
            name: '海南',
            value: 36
        }, {
            name: '台湾',
            value: 40
        }, {
            name: '香港',
            value: 20
        }, {
            name: '澳门',
            value: 23
        }];

        var geoCoordMap = {};

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            console.log(geoCoordMap);
            return res;
        };
        var currentMapData = {};
        var prevMapData = {
            type: 'country',
            pName: 'china',
            name: '中国'
        };
        backBtn.onclick = function () {
            getChinaJson();
            initEcharts(prevMapData);
            currentMapData = {
                type: prevMapData.type,
                pName: prevMapData.pName,
                name: prevMapData.name
            };
            prevMapData = {
                type: 'country',
                pName: 'china',
                name: '中国'
            };
            backBtn.innerHTML = '返回' + prevMapData.name;
        };

        getChinaJson();
        initEcharts(prevMapData);

        // 初始化echarts
        function initEcharts(mapData) {
            var tmpSeriesData = [];
            if (mapData.type === "country") {
                tmpSeriesData = seriesData;
                backBtn.style.display = 'none';
            } else {
                tmpSeriesData = getSeriseDataFromGeoJson(mapData.name);
                backBtn.style.display = 'inline-block';
            }
            backBtn.innerHTML = '返回' + prevMapData.name;
            var top5Data = tmpSeriesData.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5);
            var isHainan = mapData.name==='海南';
            var option = {
                animation: true,
                backgroundColor: {
                    image: canvas1,
                    repeat: 'no-repeat'
                },
                title: {
                    text: mapData.name,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                visualMap: {
                    show: true,
                    min: 0,
                    max: 200,
                    left: 'left',
                    top: '60%',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: [1],
                    inRange: {
                        // color: ['#3B5077', '#031525'] // 蓝黑
                        // color: ['#ffc0cb', '#800080'] // 红紫
                        // color: ['#3C3B3F', '#605C3C'] // 黑绿
                        // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                        // color: ['#23074d', '#cc5333'] // 紫红
                        color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#1488CC', '#2B32B2'] // 浅蓝
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿
                        // color: ['#00467F', '#A5CC82'] // 蓝绿

                    }
                },
                geo: Object.assign({
                    show: true,
                    map: mapData.pName === 'china' ? 'china' : mapData.name,
                    top: "5%", //组件距离容器的距离
                    zoom: 1.1,
                    roam: false, //是否开启鼠标缩放和平移漫游
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        }
                    }
                }, isHainan ? {
                    zoom: 4.5,
                    roam: true,
                    center: ['109.508268', '18.247872']
                } : {}),
                series: [
                    {
                        name: '散点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(tmpSeriesData),
                        symbolSize: function (val) {
                            return sizeFunction(val);
                        },
                        label: {
                            normal: {
                                formatter: function (param) {
                                    if (top5Data.filter(function (item) {
                                            return item.name === param.name
                                        }).length > 0) {
                                        return '';
                                    } else {
                                        return param.name;
                                    }
                                },
                                position: 'right',
                                show: true,
                                color: '#fff'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#05C3F9'
                            }
                        }
                    },
                    Object.assign({
                        name: mapData.name,
                        type: 'map',
                        mapType: mapData.pName === 'china' ? 'china' : mapData.name,
                        geoIndex: 0,
                        data: tmpSeriesData,
                        top: "5%", //组件距离容器的距离
                        zoom: 1.1,
                        roam: false, //是否开启鼠标缩放和平移漫游
                        // selectedMode: 'single',

                        label: {
                            normal: {
                                show: true, //显示省份标签
                                textStyle: {
                                    color: "#fbfdfe"
                                } //省份标签字体颜色
                            },
                            emphasis: { //对应的鼠标悬浮效果
                                show: true,
                                textStyle: {
                                    color: "#323232"
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: .5, //区域边框宽度
                                borderColor: '#0550c3', //区域边框颜色
                                areaColor: "#4ea397", //区域颜色

                            },

                            emphasis: {
                                borderWidth: .5,
                                borderColor: '#4b0082',
                                areaColor: "#ece39e",
                            }
                        },
                    }, isHainan ? {
                        zoom: 4.5,
                        roam: true,
                        center: ['109.508268', '18.247872']
                    } : {}),
                    {
                        name: '点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin', //气泡
                        symbolSize: function (val) {
                            var a = (maxSize4Pin - minSize4Pin) / (max - min);
                            var b = minSize4Pin - a * min;
                            b = maxSize4Pin - a * max;
                            return a * val[2] + b;
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 9,
                                },
                                formatter: function (param) {
                                    return param.value[2]
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#F62157', //标志颜色
                            }
                        },
                        zlevel: 6,
                        data: convertData(tmpSeriesData),
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(top5Data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'yellow',
                                shadowBlur: 10,
                                shadowColor: 'yellow'
                            }
                        },
                        zlevel: 1
                    }
                ]

            };
            myChart.clear();
            myChart.setOption(option);

            myChart.off("click");

            if (mapData.type === "country") { // 全国时，添加click 进入省级
                myChart.on('click', function (param) {
                    // 遍历取到provincesText 中的下标  去拿到对应的省js
                    for (var i = 0; i < provincesText.length; i++) {
                        if (param.name === provincesText[i]) {
                            //显示对应省份的方法
                            showProvince(provinces[i], provincesText[i]);
                            break;
                        }
                    }
                    // if (param.componentType === 'series') {
                    //     var provinceName = param.name;
                    //     $('#box').css('display', 'block');
                    //     $("#box-title").html(provinceName);
                    // }
                });
            } else if (mapData.type === 'province') { // 省级时，添加click 进入市级
                myChart.on('click', function (param) {
                    showCity(mapData.pName, param.name);
                });
            } else {
                // 省份，添加双击 回退到上一层级
                myChart.on("dblclick", function () {
                    initEcharts({
                        type: 'country',
                        pName: 'china',
                        name: '中国'
                    });
                });
            }
        }

        function getChinaJson() {
            echarts.getMap('china').geoJson.features.forEach(function (item) {
                var name = item.properties.name;
                geoCoordMap[name] = item.properties.cp;
            });
        }

        function sizeFunction(x) {
            var y = Math.sqrt(x / (max * 10)) + 0.1;
            return y * 80;
        };

        function getSeriseDataFromGeoJson(mapName) {
            var seriesData = [];
            geoCoordMap = {};
            var provinceJson = echarts.getMap(mapName);
            if (provinceJson) {
                provinceJson.geoJson.features.forEach(function (item) {
                    var name = item.properties.name;
                    seriesData.push({
                        name: name,
                        value: Math.ceil(Math.random() * 199)
                    });
                    geoCoordMap[name] = item.properties.cp || item.properties.centroid;
                })
            }
            return seriesData;
        }

        // 展示对应的省
        function showProvince(pName, name) {
            //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
            loadBdScript('$' + pName + 'JS', './public/json/map/province/' + pName + '.js', function () {
                prevMapData = {
                    type: 'country',
                    pName: 'china',
                    name: '中国'
                }
                currentMapData = {
                    type: 'province',
                    pName: pName,
                    name: name
                }
                initEcharts(currentMapData);
            });
        }

        // 展示对应市
        function showCity(pName, name) {
            $.getJSON('./public/json/map/province/' + pName + '/' + name + '.json', function (data) {
                echarts.registerMap(name, data) //注册
                prevMapData = {
                    type: currentMapData.type,
                    pName: currentMapData.pName,
                    name: currentMapData.name
                }
                currentMapData = {
                    type: 'city',
                    pName: pName,
                    name: name
                }
                initEcharts(currentMapData);
            });
        }

        // 加载对应的JS
        function loadBdScript(scriptId, url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { // Others
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            script.id = scriptId;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
})