const v8 = require('v8');

// 从 V8 版本、命令行标志、以及检测到的 CPU 特性派生的版本标记
console.log(v8.cachedDataVersionTag());
// 4151506697

// 获取 v8 堆空间的统计信息
console.log(v8.getHeapSpaceStatistics());
// [ { space_name: 'read_only_space',
//     space_size: 524288,
//     space_used_size: 35200,
//     space_available_size: 480384,
//     physical_space_size: 43904 },
//   { space_name: 'new_space',
//     space_size: 2097152,
//     space_used_size: 966784,
//     space_available_size: 64384,
//     physical_space_size: 2046080 },
//   { space_name: 'old_space',
//     space_size: 2330624,
//     space_used_size: 2154208,
//     space_available_size: 144,
//     physical_space_size: 2197728 },
//   { space_name: 'code_space',
//     space_size: 1048576,
//     space_used_size: 559968,
//     space_available_size: 0,
//     physical_space_size: 592736 },
//   { space_name: 'map_space',
//     space_size: 536576,
//     space_used_size: 349976,
//     space_available_size: 0,
//     physical_space_size: 367384 },
//   { space_name: 'large_object_space',
//     space_size: 0,
//     space_used_size: 0,
//     space_available_size: 1520180736,
//     physical_space_size: 0 } ]


// 获取 v8 堆整体统计信息
console.log(v8.getHeapStatistics());
//{ total_heap_size: 7708672,
//   total_heap_size_executable: 3670016,
//   total_physical_size: 6046160,
//   total_available_size: 1492594096,
//   used_heap_size: 4353160,
//   heap_size_limit: 1501560832,
//   malloced_memory: 8192,
//   peak_malloced_memory: 1185552,
//   does_zap_garbage: 0 }


// setFlagsFromString
for (let i = 0; i < 100; i++) {
    const a = 1;
    setTimeout(() => console.log(a), 10);
}

v8.setFlagsFromString('--trace_gc');
setTimeout(() => { v8.setFlagsFromString('--notrace_gc'); }, 10*1000);

