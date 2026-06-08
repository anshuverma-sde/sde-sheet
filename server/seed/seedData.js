require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Topic = require('../modules/topics/topic.model');
const Problem = require('../modules/problems/problem.model');

// ─── Topics ───────────────────────────────────────────────────────────────────
// Matches the section structure of the Apna College DSA Sheet (dsa.apnacollege.in)
const topics = [
  { title: 'Arrays',                   description: 'Fundamental array operations, sliding window, two pointers, prefix sums', order: 1 },
  { title: 'Strings',                  description: 'String manipulation, sliding window, hashing, pattern matching', order: 2 },
  { title: 'Linked List',              description: 'Singly & doubly linked lists, fast & slow pointer techniques', order: 3 },
  { title: 'Stack & Queue',            description: 'Monotonic stack, deque, next greater/smaller element patterns', order: 4 },
  { title: 'Binary Search',            description: 'Search on sorted arrays, rotated arrays, and answer-space binary search', order: 5 },
  { title: 'Sorting',                  description: 'Comparison & non-comparison based sorting, divide and conquer', order: 6 },
  { title: 'Recursion & Backtracking', description: 'Subsets, permutations, combinations, constraint satisfaction, pruning', order: 7 },
  { title: 'Trees',                    description: 'Binary trees, BST, traversals, construction, views', order: 8 },
  { title: 'Graphs',                   description: 'BFS, DFS, shortest path, topological sort, union-find', order: 9 },
  { title: 'Dynamic Programming',      description: 'Memoization, tabulation, classic 1D/2D DP, interval DP, knapsack', order: 10 },
  { title: 'Heaps & Priority Queue',   description: 'Min/max heap, top-K problems, merge K sorted structures', order: 11 },
  { title: 'Greedy',                   description: 'Activity selection, interval scheduling, greedy choice property', order: 12 },
  { title: 'Tries',                    description: 'Trie insert/search, prefix problems, XOR maximum', order: 13 },
  { title: 'Bit Manipulation',         description: 'Bitwise operations, XOR tricks, bitmask DP', order: 14 },
];

// ─── Problems ─────────────────────────────────────────────────────────────────
const problemsData = [

  // ══════════════════════ ARRAYS ═══════════════════════════════════════════════
  {
    topicKey: 'Arrays', title: 'Two Sum', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/two-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    articleLink:  'https://www.geeksforgeeks.org/two-sum-problem/',
  },
  {
    topicKey: 'Arrays', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    youtubeLink:  'https://www.youtube.com/watch?v=1pkOgXD63yU',
    articleLink:  'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/',
  },
  {
    topicKey: 'Arrays', title: 'Contains Duplicate', difficulty: 'Easy', order: 3,
    practiceLink: 'https://leetcode.com/problems/contains-duplicate/',
    youtubeLink:  'https://www.youtube.com/watch?v=3OamzN90kPg',
    articleLink:  'https://www.geeksforgeeks.org/check-if-array-contains-duplicate/',
  },
  {
    topicKey: 'Arrays', title: 'Maximum Subarray (Kadane\'s Algorithm)', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/maximum-subarray/',
    youtubeLink:  'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
    articleLink:  'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/',
  },
  {
    topicKey: 'Arrays', title: 'Product of Array Except Self', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/product-of-array-except-self/',
    youtubeLink:  'https://www.youtube.com/watch?v=bNvIQI2wAjk',
    articleLink:  'https://www.geeksforgeeks.org/product-array-puzzle/',
  },
  {
    topicKey: 'Arrays', title: 'Maximum Product Subarray', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/maximum-product-subarray/',
    youtubeLink:  'https://www.youtube.com/watch?v=lXVy6YWFcRM',
    articleLink:  'https://www.geeksforgeeks.org/maximum-product-subarray/',
  },
  {
    topicKey: 'Arrays', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=nIVW4P8b1VA',
    articleLink:  'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/',
  },
  {
    topicKey: 'Arrays', title: '3Sum', difficulty: 'Medium', order: 8,
    practiceLink: 'https://leetcode.com/problems/3sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=jzZsG8n2R9A',
    articleLink:  'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/',
  },
  {
    topicKey: 'Arrays', title: 'Container With Most Water', difficulty: 'Medium', order: 9,
    practiceLink: 'https://leetcode.com/problems/container-with-most-water/',
    youtubeLink:  'https://www.youtube.com/watch?v=UuiTKBwPgAo',
    articleLink:  'https://www.geeksforgeeks.org/container-with-most-water/',
  },
  {
    topicKey: 'Arrays', title: 'Trapping Rain Water', difficulty: 'Tough', order: 10,
    practiceLink: 'https://leetcode.com/problems/trapping-rain-water/',
    youtubeLink:  'https://www.youtube.com/watch?v=ZI2z5pq0TqA',
    articleLink:  'https://www.geeksforgeeks.org/trapping-rain-water/',
  },
  {
    topicKey: 'Arrays', title: 'Set Matrix Zeroes', difficulty: 'Medium', order: 11,
    practiceLink: 'https://leetcode.com/problems/set-matrix-zeroes/',
    youtubeLink:  'https://www.youtube.com/watch?v=M65xBewcqcI',
    articleLink:  'https://www.geeksforgeeks.org/a-boolean-matrix-question/',
  },
  {
    topicKey: 'Arrays', title: 'Rotate Matrix by 90 Degrees', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/rotate-image/',
    youtubeLink:  'https://www.youtube.com/watch?v=Y72QeX0Efxw',
    articleLink:  'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/',
  },
  {
    topicKey: 'Arrays', title: 'Spiral Matrix', difficulty: 'Medium', order: 13,
    practiceLink: 'https://leetcode.com/problems/spiral-matrix/',
    youtubeLink:  'https://www.youtube.com/watch?v=3Zv61L2MgHg',
    articleLink:  'https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/',
  },
  {
    topicKey: 'Arrays', title: 'Merge Intervals', difficulty: 'Medium', order: 14,
    practiceLink: 'https://leetcode.com/problems/merge-intervals/',
    youtubeLink:  'https://www.youtube.com/watch?v=44H3cEC2fFM',
    articleLink:  'https://www.geeksforgeeks.org/merging-intervals/',
  },
  {
    topicKey: 'Arrays', title: 'Next Permutation', difficulty: 'Medium', order: 15,
    practiceLink: 'https://leetcode.com/problems/next-permutation/',
    youtubeLink:  'https://www.youtube.com/watch?v=JDOXKqF60RQ',
    articleLink:  'https://www.geeksforgeeks.org/next-permutation/',
  },
  {
    topicKey: 'Arrays', title: 'Majority Element (Moore\'s Voting)', difficulty: 'Easy', order: 16,
    practiceLink: 'https://leetcode.com/problems/majority-element/',
    youtubeLink:  'https://www.youtube.com/watch?v=nP_ns3uSh80',
    articleLink:  'https://www.geeksforgeeks.org/majority-element/',
  },
  {
    topicKey: 'Arrays', title: 'Longest Consecutive Sequence', difficulty: 'Medium', order: 17,
    practiceLink: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    youtubeLink:  'https://www.youtube.com/watch?v=qgizvmgeyUM',
    articleLink:  'https://www.geeksforgeeks.org/longest-consecutive-subsequence/',
  },
  {
    topicKey: 'Arrays', title: '4Sum', difficulty: 'Tough', order: 18,
    practiceLink: 'https://leetcode.com/problems/4sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=EYeR-_1NRlQ',
    articleLink:  'https://www.geeksforgeeks.org/find-four-elements-that-sum-to-a-given-value-set-2/',
  },
  {
    topicKey: 'Arrays', title: 'Subarray with Given XOR K', difficulty: 'Tough', order: 19,
    practiceLink: 'https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1',
    youtubeLink:  'https://www.youtube.com/watch?v=eZr-6p0B7ME',
    articleLink:  'https://www.geeksforgeeks.org/count-number-of-subsets-with-given-xor-value/',
  },
  {
    topicKey: 'Arrays', title: 'Count Inversions in Array', difficulty: 'Tough', order: 20,
    practiceLink: 'https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=kQ1mJlwW-c0',
    articleLink:  'https://www.geeksforgeeks.org/counting-inversions/',
  },

  // ══════════════════════ STRINGS ══════════════════════════════════════════════
  {
    topicKey: 'Strings', title: 'Valid Anagram', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/valid-anagram/',
    youtubeLink:  'https://www.youtube.com/watch?v=9UtInBqnCgA',
    articleLink:  'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/',
  },
  {
    topicKey: 'Strings', title: 'Valid Palindrome', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/valid-palindrome/',
    youtubeLink:  'https://www.youtube.com/watch?v=jJXJ16kPFWg',
    articleLink:  'https://www.geeksforgeeks.org/check-if-a-number-is-palindrome/',
  },
  {
    topicKey: 'Strings', title: 'Longest Common Prefix', difficulty: 'Easy', order: 3,
    practiceLink: 'https://leetcode.com/problems/longest-common-prefix/',
    youtubeLink:  'https://www.youtube.com/watch?v=0sWShKIJoo4',
    articleLink:  'https://www.geeksforgeeks.org/longest-common-prefix-using-sorting/',
  },
  {
    topicKey: 'Strings', title: 'Isomorphic Strings', difficulty: 'Easy', order: 4,
    practiceLink: 'https://leetcode.com/problems/isomorphic-strings/',
    youtubeLink:  'https://www.youtube.com/watch?v=7yF-U1hLEqQ',
    articleLink:  'https://www.geeksforgeeks.org/check-if-two-given-strings-are-isomorphic-to-each-other/',
  },
  {
    topicKey: 'Strings', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    youtubeLink:  'https://www.youtube.com/watch?v=wiGpQwVHdE0',
    articleLink:  'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/',
  },
  {
    topicKey: 'Strings', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    youtubeLink:  'https://www.youtube.com/watch?v=gqXU1UyA8pk',
    articleLink:  'https://www.geeksforgeeks.org/longest-repeating-character-replacement/',
  },
  {
    topicKey: 'Strings', title: 'Group Anagrams', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/group-anagrams/',
    youtubeLink:  'https://www.youtube.com/watch?v=vzdNOK2oB2E',
    articleLink:  'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/',
  },
  {
    topicKey: 'Strings', title: 'Roman to Integer', difficulty: 'Easy', order: 8,
    practiceLink: 'https://leetcode.com/problems/roman-to-integer/',
    youtubeLink:  'https://www.youtube.com/watch?v=dlATMslQ6Uc',
    articleLink:  'https://www.geeksforgeeks.org/converting-roman-numerals-decimal-lying-1-3999/',
  },
  {
    topicKey: 'Strings', title: 'Longest Palindromic Substring', difficulty: 'Medium', order: 9,
    practiceLink: 'https://leetcode.com/problems/longest-palindromic-substring/',
    youtubeLink:  'https://www.youtube.com/watch?v=XYQecbcd6_c',
    articleLink:  'https://www.geeksforgeeks.org/longest-palindrome-substring/',
  },
  {
    topicKey: 'Strings', title: 'Palindromic Substrings (Count)', difficulty: 'Medium', order: 10,
    practiceLink: 'https://leetcode.com/problems/palindromic-substrings/',
    youtubeLink:  'https://www.youtube.com/watch?v=4RACzI5-du8',
    articleLink:  'https://www.geeksforgeeks.org/count-palindrome-sub-strings-of-a-string/',
  },
  {
    topicKey: 'Strings', title: 'Minimum Window Substring', difficulty: 'Tough', order: 11,
    practiceLink: 'https://leetcode.com/problems/minimum-window-substring/',
    youtubeLink:  'https://www.youtube.com/watch?v=jSto0O4AJbM',
    articleLink:  'https://www.geeksforgeeks.org/find-the-smallest-window-in-a-string-containing-all-characters-of-another-string/',
  },
  {
    topicKey: 'Strings', title: 'Encode and Decode Strings', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/encode-and-decode-strings/',
    youtubeLink:  'https://www.youtube.com/watch?v=B1k_sxOSgv8',
    articleLink:  'https://www.geeksforgeeks.org/encode-and-decode-strings/',
  },
  {
    topicKey: 'Strings', title: 'KMP Algorithm (String Matching)', difficulty: 'Tough', order: 13,
    practiceLink: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
    youtubeLink:  'https://www.youtube.com/watch?v=V5-7GzOfADQ',
    articleLink:  'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/',
  },
  {
    topicKey: 'Strings', title: 'Rabin-Karp Algorithm', difficulty: 'Tough', order: 14,
    practiceLink: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
    youtubeLink:  'https://www.youtube.com/watch?v=qQ8vS2btsxI',
    articleLink:  'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/',
  },

  // ══════════════════════ LINKED LIST ══════════════════════════════════════════
  {
    topicKey: 'Linked List', title: 'Reverse a Linked List', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/reverse-linked-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=G0_I-ZF0S38',
    articleLink:  'https://www.geeksforgeeks.org/reverse-a-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Find Middle of Linked List', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/middle-of-the-linked-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=7LjQ57RqgEc',
    articleLink:  'https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Detect Cycle in Linked List', difficulty: 'Easy', order: 3,
    practiceLink: 'https://leetcode.com/problems/linked-list-cycle/',
    youtubeLink:  'https://www.youtube.com/watch?v=wiOo4DC5GGA',
    articleLink:  'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Find Starting Point of Loop in LL', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/linked-list-cycle-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=QfbOhn0WZ88',
    articleLink:  'https://www.geeksforgeeks.org/find-first-node-of-loop-in-a-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Merge Two Sorted Lists', difficulty: 'Easy', order: 5,
    practiceLink: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    youtubeLink:  'https://www.youtube.com/watch?v=XIdigk956u0',
    articleLink:  'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/',
  },
  {
    topicKey: 'Linked List', title: 'Remove Nth Node From End', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=XVuQxVej6y8',
    articleLink:  'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Check if LL is Palindrome', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/palindrome-linked-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=-DtNInqFUXs',
    articleLink:  'https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/',
  },
  {
    topicKey: 'Linked List', title: 'Reorder Linked List', difficulty: 'Medium', order: 8,
    practiceLink: 'https://leetcode.com/problems/reorder-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=S5bfdUTrKLM',
    articleLink:  'https://www.geeksforgeeks.org/rearrange-a-given-linked-list-in-place/',
  },
  {
    topicKey: 'Linked List', title: 'Add Two Numbers as Linked List', difficulty: 'Medium', order: 9,
    practiceLink: 'https://leetcode.com/problems/add-two-numbers/',
    youtubeLink:  'https://www.youtube.com/watch?v=XmRrGzR6udg',
    articleLink:  'https://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/',
  },
  {
    topicKey: 'Linked List', title: 'Intersection of Two Linked Lists', difficulty: 'Easy', order: 10,
    practiceLink: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    youtubeLink:  'https://www.youtube.com/watch?v=0DYoPz2Tpt4',
    articleLink:  'https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/',
  },
  {
    topicKey: 'Linked List', title: 'Reverse LL in Groups of K', difficulty: 'Tough', order: 11,
    practiceLink: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
    youtubeLink:  'https://www.youtube.com/watch?v=lIar1skcQYI',
    articleLink:  'https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/',
  },
  {
    topicKey: 'Linked List', title: 'Rotate a Linked List', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/rotate-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=9VPm6nEbVPA',
    articleLink:  'https://www.geeksforgeeks.org/rotate-a-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Flattening of a Linked List', difficulty: 'Tough', order: 13,
    practiceLink: 'https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1',
    youtubeLink:  'https://www.youtube.com/watch?v=ysytSSXpAI0',
    articleLink:  'https://www.geeksforgeeks.org/flattening-a-linked-list/',
  },
  {
    topicKey: 'Linked List', title: 'Merge K Sorted Lists', difficulty: 'Tough', order: 14,
    practiceLink: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    youtubeLink:  'https://www.youtube.com/watch?v=q5a5OiGbT6Q',
    articleLink:  'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/',
  },
  {
    topicKey: 'Linked List', title: 'LRU Cache', difficulty: 'Tough', order: 15,
    practiceLink: 'https://leetcode.com/problems/lru-cache/',
    youtubeLink:  'https://www.youtube.com/watch?v=7ABFKPK2hD4',
    articleLink:  'https://www.geeksforgeeks.org/lru-cache-implementation/',
  },
  {
    topicKey: 'Linked List', title: 'Clone Linked List with Random Pointer', difficulty: 'Tough', order: 16,
    practiceLink: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    youtubeLink:  'https://www.youtube.com/watch?v=q570bKdrnlw',
    articleLink:  'https://www.geeksforgeeks.org/clone-a-linked-list-with-next-and-random-pointer-set-2/',
  },

  // ══════════════════════ STACK & QUEUE ════════════════════════════════════════
  {
    topicKey: 'Stack & Queue', title: 'Valid Parentheses', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/valid-parentheses/',
    youtubeLink:  'https://www.youtube.com/watch?v=WTzjTskDFMg',
    articleLink:  'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Min Stack', difficulty: 'Medium', order: 2,
    practiceLink: 'https://leetcode.com/problems/min-stack/',
    youtubeLink:  'https://www.youtube.com/watch?v=WxTWL-RQ4Cs',
    articleLink:  'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Implement Queue using Stacks', difficulty: 'Easy', order: 3,
    practiceLink: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    youtubeLink:  'https://www.youtube.com/watch?v=eanwa3ht3YQ',
    articleLink:  'https://www.geeksforgeeks.org/queue-using-stacks/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Implement Stack using Queues', difficulty: 'Easy', order: 4,
    practiceLink: 'https://leetcode.com/problems/implement-stack-using-queues/',
    youtubeLink:  'https://www.youtube.com/watch?v=rW4vm0-DLYc',
    articleLink:  'https://www.geeksforgeeks.org/implement-a-stack-using-single-queue/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Next Greater Element I', difficulty: 'Easy', order: 5,
    practiceLink: 'https://leetcode.com/problems/next-greater-element-i/',
    youtubeLink:  'https://www.youtube.com/watch?v=Du881K7Jtk8',
    articleLink:  'https://www.geeksforgeeks.org/next-greater-element/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Daily Temperatures', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/daily-temperatures/',
    youtubeLink:  'https://www.youtube.com/watch?v=cTBiBSnjO3c',
    articleLink:  'https://www.geeksforgeeks.org/next-greater-element/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Online Stock Span', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/online-stock-span/',
    youtubeLink:  'https://www.youtube.com/watch?v=p9T9i9ADMjk',
    articleLink:  'https://www.geeksforgeeks.org/the-stock-span-problem/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Largest Rectangle in Histogram', difficulty: 'Tough', order: 8,
    practiceLink: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    youtubeLink:  'https://www.youtube.com/watch?v=zx5Sw9130L0',
    articleLink:  'https://www.geeksforgeeks.org/largest-rectangle-under-histogram/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Sliding Window Maximum', difficulty: 'Tough', order: 9,
    practiceLink: 'https://leetcode.com/problems/sliding-window-maximum/',
    youtubeLink:  'https://www.youtube.com/watch?v=DfljaUwZsOk',
    articleLink:  'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Celebrity Problem', difficulty: 'Medium', order: 10,
    practiceLink: 'https://www.geeksforgeeks.org/problems/the-celebrity-problem/1',
    youtubeLink:  'https://www.youtube.com/watch?v=9u_f_olM6DQ',
    articleLink:  'https://www.geeksforgeeks.org/the-celebrity-problem/',
  },
  {
    topicKey: 'Stack & Queue', title: 'Rotten Oranges (BFS)', difficulty: 'Medium', order: 11,
    practiceLink: 'https://leetcode.com/problems/rotting-oranges/',
    youtubeLink:  'https://www.youtube.com/watch?v=yf3oUhkvqA0',
    articleLink:  'https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/',
  },

  // ══════════════════════ BINARY SEARCH ════════════════════════════════════════
  {
    topicKey: 'Binary Search', title: 'Binary Search', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/binary-search/',
    youtubeLink:  'https://www.youtube.com/watch?v=s4DPM8ct1pI',
    articleLink:  'https://www.geeksforgeeks.org/binary-search/',
  },
  {
    topicKey: 'Binary Search', title: 'Lower Bound & Upper Bound', difficulty: 'Easy', order: 2,
    practiceLink: 'https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=0H5saWK28Ok',
    articleLink:  'https://www.geeksforgeeks.org/lower_bound-in-cpp/',
  },
  {
    topicKey: 'Binary Search', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=U8XENwh8Oy8',
    articleLink:  'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/',
  },
  {
    topicKey: 'Binary Search', title: 'Find Peak Element', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/find-peak-element/',
    youtubeLink:  'https://www.youtube.com/watch?v=HtSuA80QTyo',
    articleLink:  'https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/',
  },
  {
    topicKey: 'Binary Search', title: 'Single Element in a Sorted Array', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/single-element-in-a-sorted-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=nMGL2vlyJk0',
    articleLink:  'https://www.geeksforgeeks.org/find-the-element-that-appears-once-in-a-sorted-array/',
  },
  {
    topicKey: 'Binary Search', title: 'Koko Eating Bananas', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/koko-eating-bananas/',
    youtubeLink:  'https://www.youtube.com/watch?v=U2SozAs9RzA',
    articleLink:  'https://www.geeksforgeeks.org/koko-eating-bananas/',
  },
  {
    topicKey: 'Binary Search', title: 'Capacity to Ship Packages Within D Days', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
    youtubeLink:  'https://www.youtube.com/watch?v=s_0QcqmBGLA',
    articleLink:  'https://www.geeksforgeeks.org/capacity-to-ship-packages-within-d-days/',
  },
  {
    topicKey: 'Binary Search', title: 'Aggressive Cows', difficulty: 'Tough', order: 8,
    practiceLink: 'https://www.geeksforgeeks.org/problems/aggressive-cows/1',
    youtubeLink:  'https://www.youtube.com/watch?v=R_Mfw4ew-Vo',
    articleLink:  'https://www.geeksforgeeks.org/aggressive-cows-problem/',
  },
  {
    topicKey: 'Binary Search', title: 'Book Allocation Problem', difficulty: 'Tough', order: 9,
    practiceLink: 'https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1',
    youtubeLink:  'https://www.youtube.com/watch?v=gYmWHvRobl4',
    articleLink:  'https://www.geeksforgeeks.org/allocate-minimum-number-pages/',
  },
  {
    topicKey: 'Binary Search', title: 'Median of Two Sorted Arrays', difficulty: 'Tough', order: 10,
    practiceLink: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    youtubeLink:  'https://www.youtube.com/watch?v=q6IEA26hvXc',
    articleLink:  'https://www.geeksforgeeks.org/median-of-two-sorted-arrays/',
  },
  {
    topicKey: 'Binary Search', title: 'Kth Element of Two Sorted Arrays', difficulty: 'Tough', order: 11,
    practiceLink: 'https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1',
    youtubeLink:  'https://www.youtube.com/watch?v=nv7F4PiLUzo',
    articleLink:  'https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/',
  },
  {
    topicKey: 'Binary Search', title: 'Search in a 2D Matrix', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/search-a-2d-matrix/',
    youtubeLink:  'https://www.youtube.com/watch?v=Ber2pi2C0j0',
    articleLink:  'https://www.geeksforgeeks.org/search-in-row-wise-and-column-wise-sorted-matrix/',
  },

  // ══════════════════════ SORTING ══════════════════════════════════════════════
  {
    topicKey: 'Sorting', title: 'Bubble Sort', difficulty: 'Easy', order: 1,
    practiceLink: 'https://www.geeksforgeeks.org/problems/bubble-sort/1',
    youtubeLink:  'https://www.youtube.com/watch?v=HGk_ypEuS24',
    articleLink:  'https://www.geeksforgeeks.org/bubble-sort/',
  },
  {
    topicKey: 'Sorting', title: 'Selection Sort', difficulty: 'Easy', order: 2,
    practiceLink: 'https://www.geeksforgeeks.org/problems/selection-sort/1',
    youtubeLink:  'https://www.youtube.com/watch?v=Nd4SCCIHFWk',
    articleLink:  'https://www.geeksforgeeks.org/selection-sort/',
  },
  {
    topicKey: 'Sorting', title: 'Insertion Sort', difficulty: 'Easy', order: 3,
    practiceLink: 'https://www.geeksforgeeks.org/problems/insertion-sort/1',
    youtubeLink:  'https://www.youtube.com/watch?v=OGzPmgsI-pE',
    articleLink:  'https://www.geeksforgeeks.org/insertion-sort/',
  },
  {
    topicKey: 'Sorting', title: 'Merge Sort', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/sort-an-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=TzeBrDU-JaY',
    articleLink:  'https://www.geeksforgeeks.org/merge-sort/',
  },
  {
    topicKey: 'Sorting', title: 'Quick Sort', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/sort-an-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=7h1s2SojIRw',
    articleLink:  'https://www.geeksforgeeks.org/quick-sort/',
  },
  {
    topicKey: 'Sorting', title: 'Sort Colors (Dutch National Flag)', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/sort-colors/',
    youtubeLink:  'https://www.youtube.com/watch?v=tp8JIuCXBaU',
    articleLink:  'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/',
  },
  {
    topicKey: 'Sorting', title: 'Kth Largest Element in Array', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=XEmy13g1Qxc',
    articleLink:  'https://www.geeksforgeeks.org/kth-smallestlargest-element-in-unsorted-array/',
  },
  {
    topicKey: 'Sorting', title: 'Reverse Pairs', difficulty: 'Tough', order: 8,
    practiceLink: 'https://leetcode.com/problems/reverse-pairs/',
    youtubeLink:  'https://www.youtube.com/watch?v=S6rsAlj_iB4',
    articleLink:  'https://www.geeksforgeeks.org/count-reverse-pairs/',
  },

  // ══════════════════════ RECURSION & BACKTRACKING ══════════════════════════════
  {
    topicKey: 'Recursion & Backtracking', title: 'Subset Sums', difficulty: 'Medium', order: 1,
    practiceLink: 'https://www.geeksforgeeks.org/problems/subset-sums2234/1',
    youtubeLink:  'https://www.youtube.com/watch?v=rYkfBRtMJr8',
    articleLink:  'https://www.geeksforgeeks.org/subset-sum-problem-dp-25/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Subsets II (with Duplicates)', difficulty: 'Medium', order: 2,
    practiceLink: 'https://leetcode.com/problems/subsets-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=RIn3gOkbhQE',
    articleLink:  'https://www.geeksforgeeks.org/print-subsets-given-size-set/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Combination Sum', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/combination-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=GBKI9VSKdGg',
    articleLink:  'https://www.geeksforgeeks.org/combinational-sum/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Combination Sum II', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/combination-sum-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=G1fRTGRxXU8',
    articleLink:  'https://www.geeksforgeeks.org/combinational-sum/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Permutations', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/permutations/',
    youtubeLink:  'https://www.youtube.com/watch?v=s7AvT7cGdSo',
    articleLink:  'https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Word Search', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/word-search/',
    youtubeLink:  'https://www.youtube.com/watch?v=pfiQ_PS1g8E',
    articleLink:  'https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Palindrome Partitioning', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/palindrome-partitioning/',
    youtubeLink:  'https://www.youtube.com/watch?v=WBgsABoClE0',
    articleLink:  'https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'N-Queens', difficulty: 'Tough', order: 8,
    practiceLink: 'https://leetcode.com/problems/n-queens/',
    youtubeLink:  'https://www.youtube.com/watch?v=i05Ju7AR6cs',
    articleLink:  'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Rat in a Maze', difficulty: 'Tough', order: 9,
    practiceLink: 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1',
    youtubeLink:  'https://www.youtube.com/watch?v=bLGZhJlt4y0',
    articleLink:  'https://www.geeksforgeeks.org/rat-in-a-maze/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Sudoku Solver', difficulty: 'Tough', order: 10,
    practiceLink: 'https://leetcode.com/problems/sudoku-solver/',
    youtubeLink:  'https://www.youtube.com/watch?v=FWAIf_EVUKE',
    articleLink:  'https://www.geeksforgeeks.org/sudoku-backtracking-7/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'M Coloring Problem', difficulty: 'Tough', order: 11,
    practiceLink: 'https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=wuVwUK25Rfc',
    articleLink:  'https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/',
  },
  {
    topicKey: 'Recursion & Backtracking', title: 'Word Break (Print All Ways)', difficulty: 'Tough', order: 12,
    practiceLink: 'https://leetcode.com/problems/word-break-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=th4OnoGasMU',
    articleLink:  'https://www.geeksforgeeks.org/word-break-problem-using-backtracking/',
  },

  // ══════════════════════ TREES ═════════════════════════════════════════════════
  {
    topicKey: 'Trees', title: 'Inorder Traversal (Iterative + Recursive)', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    youtubeLink:  'https://www.youtube.com/watch?v=Z_NEgBgbRVI',
    articleLink:  'https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Preorder & Postorder Traversal', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',
    youtubeLink:  'https://www.youtube.com/watch?v=RlUu72JrOCQ',
    articleLink:  'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
  },
  {
    topicKey: 'Trees', title: 'Level Order Traversal (BFS)', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    youtubeLink:  'https://www.youtube.com/watch?v=6ZnyEApgFYg',
    articleLink:  'https://www.geeksforgeeks.org/level-order-tree-traversal/',
  },
  {
    topicKey: 'Trees', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', order: 4,
    practiceLink: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=hTM3phVI6YQ',
    articleLink:  'https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/',
  },
  {
    topicKey: 'Trees', title: 'Diameter of Binary Tree', difficulty: 'Easy', order: 5,
    practiceLink: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=bkxqA8Rfv04',
    articleLink:  'https://www.geeksforgeeks.org/diameter-of-a-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Balanced Binary Tree', difficulty: 'Easy', order: 6,
    practiceLink: 'https://leetcode.com/problems/balanced-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=Yt50Jfbd8Po',
    articleLink:  'https://www.geeksforgeeks.org/how-to-determine-if-a-binary-tree-is-balanced/',
  },
  {
    topicKey: 'Trees', title: 'Right View of Binary Tree', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/binary-tree-right-side-view/',
    youtubeLink:  'https://www.youtube.com/watch?v=KV4mRzTjlAk',
    articleLink:  'https://www.geeksforgeeks.org/right-view-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Top View of Binary Tree', difficulty: 'Medium', order: 8,
    practiceLink: 'https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1',
    youtubeLink:  'https://www.youtube.com/watch?v=Et9OCDNvJ78',
    articleLink:  'https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Bottom View of Binary Tree', difficulty: 'Medium', order: 9,
    practiceLink: 'https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1',
    youtubeLink:  'https://www.youtube.com/watch?v=0FtVY6I4pB8',
    articleLink:  'https://www.geeksforgeeks.org/bottom-view-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Vertical Order Traversal', difficulty: 'Tough', order: 10,
    practiceLink: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=q_a6lpbKJdw',
    articleLink:  'https://www.geeksforgeeks.org/vertical-order-traversal-of-binary-tree-using-map/',
  },
  {
    topicKey: 'Trees', title: 'Lowest Common Ancestor of Binary Tree', difficulty: 'Medium', order: 11,
    practiceLink: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=_-QHfMDde90',
    articleLink:  'https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/',
  },
  {
    topicKey: 'Trees', title: 'Lowest Common Ancestor of BST', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=gs2LMfuOR9k',
    articleLink:  'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/',
  },
  {
    topicKey: 'Trees', title: 'Validate Binary Search Tree', difficulty: 'Medium', order: 13,
    practiceLink: 'https://leetcode.com/problems/validate-binary-search-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=s6ATEkipzow',
    articleLink:  'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/',
  },
  {
    topicKey: 'Trees', title: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'Medium', order: 14,
    practiceLink: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    youtubeLink:  'https://www.youtube.com/watch?v=G5c1wM3Kpuw',
    articleLink:  'https://www.geeksforgeeks.org/construct-tree-from-given-inorder-and-preorder-traversal/',
  },
  {
    topicKey: 'Trees', title: 'Binary Tree Maximum Path Sum', difficulty: 'Tough', order: 15,
    practiceLink: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=Hr5cWUld4vU',
    articleLink:  'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', order: 16,
    practiceLink: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/',
    youtubeLink:  'https://www.youtube.com/watch?v=sli-uAteOek',
    articleLink:  'https://www.geeksforgeeks.org/flatten-a-binary-tree-into-linked-list/',
  },
  {
    topicKey: 'Trees', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Tough', order: 17,
    practiceLink: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=-YbXySKJsX8',
    articleLink:  'https://www.geeksforgeeks.org/serialize-deserialize-binary-tree/',
  },
  {
    topicKey: 'Trees', title: 'Kth Smallest Element in BST', difficulty: 'Medium', order: 18,
    practiceLink: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    youtubeLink:  'https://www.youtube.com/watch?v=9TJYWh0adfk',
    articleLink:  'https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/',
  },

  // ══════════════════════ GRAPHS ════════════════════════════════════════════════
  {
    topicKey: 'Graphs', title: 'BFS of Graph', difficulty: 'Easy', order: 1,
    practiceLink: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1',
    youtubeLink:  'https://www.youtube.com/watch?v=-tgVpUgsQ5k',
    articleLink:  'https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/',
  },
  {
    topicKey: 'Graphs', title: 'DFS of Graph', difficulty: 'Easy', order: 2,
    practiceLink: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1',
    youtubeLink:  'https://www.youtube.com/watch?v=Qzf1a--rhp8',
    articleLink:  'https://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/',
  },
  {
    topicKey: 'Graphs', title: 'Number of Islands', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/number-of-islands/',
    youtubeLink:  'https://www.youtube.com/watch?v=pV2kpPD66nE',
    articleLink:  'https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/',
  },
  {
    topicKey: 'Graphs', title: 'Detect Cycle in Undirected Graph (BFS)', difficulty: 'Medium', order: 4,
    practiceLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1',
    youtubeLink:  'https://www.youtube.com/watch?v=A8ko93TyOns',
    articleLink:  'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/',
  },
  {
    topicKey: 'Graphs', title: 'Detect Cycle in Directed Graph', difficulty: 'Medium', order: 5,
    practiceLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1',
    youtubeLink:  'https://www.youtube.com/watch?v=9twcmtQj4DU',
    articleLink:  'https://www.geeksforgeeks.org/detect-cycle-in-a-graph/',
  },
  {
    topicKey: 'Graphs', title: 'Topological Sort (DFS + Kahn\'s BFS)', difficulty: 'Medium', order: 6,
    practiceLink: 'https://www.geeksforgeeks.org/problems/topological-sort/1',
    youtubeLink:  'https://www.youtube.com/watch?v=5lZ0iJMrUMk',
    articleLink:  'https://www.geeksforgeeks.org/topological-sorting/',
  },
  {
    topicKey: 'Graphs', title: 'Course Schedule (Cycle in Directed Graph)', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/course-schedule/',
    youtubeLink:  'https://www.youtube.com/watch?v=EgI5nU9etnU',
    articleLink:  'https://www.geeksforgeeks.org/detect-cycle-in-a-graph/',
  },
  {
    topicKey: 'Graphs', title: 'Clone Graph', difficulty: 'Medium', order: 8,
    practiceLink: 'https://leetcode.com/problems/clone-graph/',
    youtubeLink:  'https://www.youtube.com/watch?v=mQeF6bN8hMk',
    articleLink:  'https://www.geeksforgeeks.org/clone-an-undirected-graph/',
  },
  {
    topicKey: 'Graphs', title: 'Number of Provinces (Connected Components)', difficulty: 'Medium', order: 9,
    practiceLink: 'https://leetcode.com/problems/number-of-provinces/',
    youtubeLink:  'https://www.youtube.com/watch?v=ACzkVtewUYA',
    articleLink:  'https://www.geeksforgeeks.org/number-of-provinces/',
  },
  {
    topicKey: 'Graphs', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', order: 10,
    practiceLink: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    youtubeLink:  'https://www.youtube.com/watch?v=s-VIfNTdB10',
    articleLink:  'https://www.geeksforgeeks.org/pacific-atlantic-water-flow/',
  },
  {
    topicKey: 'Graphs', title: 'Dijkstra\'s Shortest Path', difficulty: 'Medium', order: 11,
    practiceLink: 'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1',
    youtubeLink:  'https://www.youtube.com/watch?v=V6H1qAeB-l4',
    articleLink:  'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/',
  },
  {
    topicKey: 'Graphs', title: 'Bellman-Ford Algorithm', difficulty: 'Medium', order: 12,
    practiceLink: 'https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1',
    youtubeLink:  'https://www.youtube.com/watch?v=0vVofAhAYjc',
    articleLink:  'https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/',
  },
  {
    topicKey: 'Graphs', title: 'Minimum Spanning Tree (Prim\'s)', difficulty: 'Medium', order: 13,
    practiceLink: 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1',
    youtubeLink:  'https://www.youtube.com/watch?v=mJcZjjKzeqk',
    articleLink:  'https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/',
  },
  {
    topicKey: 'Graphs', title: 'Disjoint Set Union (Union-Find)', difficulty: 'Medium', order: 14,
    practiceLink: 'https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1',
    youtubeLink:  'https://www.youtube.com/watch?v=aBxjDBC4M1U',
    articleLink:  'https://www.geeksforgeeks.org/union-find/',
  },
  {
    topicKey: 'Graphs', title: 'Word Ladder', difficulty: 'Tough', order: 15,
    practiceLink: 'https://leetcode.com/problems/word-ladder/',
    youtubeLink:  'https://www.youtube.com/watch?v=h9iTnkgv05E',
    articleLink:  'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/',
  },
  {
    topicKey: 'Graphs', title: 'Alien Dictionary', difficulty: 'Tough', order: 16,
    practiceLink: 'https://www.geeksforgeeks.org/problems/alien-dictionary/1',
    youtubeLink:  'https://www.youtube.com/watch?v=6kTZYvNNyps',
    articleLink:  'https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/',
  },
  {
    topicKey: 'Graphs', title: 'Strongly Connected Components (Kosaraju\'s)', difficulty: 'Tough', order: 17,
    practiceLink: 'https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1',
    youtubeLink:  'https://www.youtube.com/watch?v=V8qIqJxCioo',
    articleLink:  'https://www.geeksforgeeks.org/strongly-connected-components/',
  },

  // ══════════════════════ DYNAMIC PROGRAMMING ══════════════════════════════════
  {
    topicKey: 'Dynamic Programming', title: 'Climbing Stairs', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/climbing-stairs/',
    youtubeLink:  'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
    articleLink:  'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'House Robber', difficulty: 'Medium', order: 2,
    practiceLink: 'https://leetcode.com/problems/house-robber/',
    youtubeLink:  'https://www.youtube.com/watch?v=73r3KWiEvyk',
    articleLink:  'https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'House Robber II', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/house-robber-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=rWAJCfYYOvM',
    articleLink:  'https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/',
  },
  {
    topicKey: 'Dynamic Programming', title: '0/1 Knapsack Problem', difficulty: 'Medium', order: 4,
    practiceLink: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1',
    youtubeLink:  'https://www.youtube.com/watch?v=8LusJS5-AGo',
    articleLink:  'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Coin Change', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/coin-change/',
    youtubeLink:  'https://www.youtube.com/watch?v=H9bfqozjoqs',
    articleLink:  'https://www.geeksforgeeks.org/coin-change-dp-7/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Coin Change II (Number of Ways)', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/coin-change-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=Mjy4hd2xgrs',
    articleLink:  'https://www.geeksforgeeks.org/coin-change-dp-7/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Longest Common Subsequence', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/longest-common-subsequence/',
    youtubeLink:  'https://www.youtube.com/watch?v=Ua0GhIs5wWA',
    articleLink:  'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Longest Increasing Subsequence', difficulty: 'Medium', order: 8,
    practiceLink: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    youtubeLink:  'https://www.youtube.com/watch?v=cjWnW0hdF1Y',
    articleLink:  'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Unique Paths', difficulty: 'Medium', order: 9,
    practiceLink: 'https://leetcode.com/problems/unique-paths/',
    youtubeLink:  'https://www.youtube.com/watch?v=IlEsdxuD4lY',
    articleLink:  'https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Minimum Path Sum', difficulty: 'Medium', order: 10,
    practiceLink: 'https://leetcode.com/problems/minimum-path-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=-dLJWDnFLEo',
    articleLink:  'https://www.geeksforgeeks.org/min-cost-path-dp-6/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Word Break', difficulty: 'Medium', order: 11,
    practiceLink: 'https://leetcode.com/problems/word-break/',
    youtubeLink:  'https://www.youtube.com/watch?v=Sx9NNgInc3A',
    articleLink:  'https://www.geeksforgeeks.org/word-break-problem-dp-32/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Partition Equal Subset Sum', difficulty: 'Medium', order: 12,
    practiceLink: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=7GTpwgsmHgU',
    articleLink:  'https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Target Sum', difficulty: 'Medium', order: 13,
    practiceLink: 'https://leetcode.com/problems/target-sum/',
    youtubeLink:  'https://www.youtube.com/watch?v=g0npyaQtAQM',
    articleLink:  'https://www.geeksforgeeks.org/count-of-subsets-with-given-sum/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Edit Distance', difficulty: 'Tough', order: 14,
    practiceLink: 'https://leetcode.com/problems/edit-distance/',
    youtubeLink:  'https://www.youtube.com/watch?v=We3YDTzNXEk',
    articleLink:  'https://www.geeksforgeeks.org/edit-distance-dp-5/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Longest Palindromic Subsequence', difficulty: 'Medium', order: 15,
    practiceLink: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
    youtubeLink:  'https://www.youtube.com/watch?v=bUr8cNWI09Q',
    articleLink:  'https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Matrix Chain Multiplication', difficulty: 'Tough', order: 16,
    practiceLink: 'https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1',
    youtubeLink:  'https://www.youtube.com/watch?v=prx1psByp7U',
    articleLink:  'https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Burst Balloons', difficulty: 'Tough', order: 17,
    practiceLink: 'https://leetcode.com/problems/burst-balloons/',
    youtubeLink:  'https://www.youtube.com/watch?v=VFskby7lUbw',
    articleLink:  'https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/',
  },
  {
    topicKey: 'Dynamic Programming', title: 'Stocks (Best Time — Multiple Transactions)', difficulty: 'Medium', order: 18,
    practiceLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
    youtubeLink:  'https://www.youtube.com/watch?v=I7j0F7AHpb8',
    articleLink:  'https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/',
  },

  // ══════════════════════ HEAPS & PRIORITY QUEUE ════════════════════════════════
  {
    topicKey: 'Heaps & Priority Queue', title: 'Implement Min Heap / Max Heap', difficulty: 'Medium', order: 1,
    practiceLink: 'https://www.geeksforgeeks.org/problems/heap-sort/1',
    youtubeLink:  'https://www.youtube.com/watch?v=HqPJF2L5h9U',
    articleLink:  'https://www.geeksforgeeks.org/heap-data-structure/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'Kth Largest Element in Stream', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
    youtubeLink:  'https://www.youtube.com/watch?v=hOjcdrqMoQ8',
    articleLink:  'https://www.geeksforgeeks.org/kth-largest-element-in-a-stream/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'K Closest Points to Origin', difficulty: 'Medium', order: 3,
    practiceLink: 'https://leetcode.com/problems/k-closest-points-to-origin/',
    youtubeLink:  'https://www.youtube.com/watch?v=rI2EBUEMfTk',
    articleLink:  'https://www.geeksforgeeks.org/find-k-closest-points-to-the-origin/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'Top K Frequent Elements', difficulty: 'Medium', order: 4,
    practiceLink: 'https://leetcode.com/problems/top-k-frequent-elements/',
    youtubeLink:  'https://www.youtube.com/watch?v=YPTqKIgVk-k',
    articleLink:  'https://www.geeksforgeeks.org/find-k-numbers-occurrences-given-array/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'Find Median from Data Stream', difficulty: 'Tough', order: 5,
    practiceLink: 'https://leetcode.com/problems/find-median-from-data-stream/',
    youtubeLink:  'https://www.youtube.com/watch?v=itmhHWaHupI',
    articleLink:  'https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'Merge K Sorted Arrays', difficulty: 'Tough', order: 6,
    practiceLink: 'https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1',
    youtubeLink:  'https://www.youtube.com/watch?v=l8CuET0jlDU',
    articleLink:  'https://www.geeksforgeeks.org/merge-k-sorted-arrays/',
  },
  {
    topicKey: 'Heaps & Priority Queue', title: 'Task Scheduler', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/task-scheduler/',
    youtubeLink:  'https://www.youtube.com/watch?v=s8p8ukTyA2I',
    articleLink:  'https://www.geeksforgeeks.org/task-scheduler/',
  },

  // ══════════════════════ GREEDY ════════════════════════════════════════════════
  {
    topicKey: 'Greedy', title: 'Activity Selection Problem', difficulty: 'Medium', order: 1,
    practiceLink: 'https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=DHr9WU8Owok',
    articleLink:  'https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/',
  },
  {
    topicKey: 'Greedy', title: 'Fractional Knapsack', difficulty: 'Medium', order: 2,
    practiceLink: 'https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=1ibsQrnuEEg',
    articleLink:  'https://www.geeksforgeeks.org/fractional-knapsack-problem/',
  },
  {
    topicKey: 'Greedy', title: 'Minimum Platforms Required', difficulty: 'Medium', order: 3,
    practiceLink: 'https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=dxVcMDI7vyI',
    articleLink:  'https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/',
  },
  {
    topicKey: 'Greedy', title: 'Job Sequencing Problem', difficulty: 'Medium', order: 4,
    practiceLink: 'https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1',
    youtubeLink:  'https://www.youtube.com/watch?v=zPtI8q9gvX8',
    articleLink:  'https://www.geeksforgeeks.org/job-sequencing-problem/',
  },
  {
    topicKey: 'Greedy', title: 'Jump Game', difficulty: 'Medium', order: 5,
    practiceLink: 'https://leetcode.com/problems/jump-game/',
    youtubeLink:  'https://www.youtube.com/watch?v=Yan0cv2cLy8',
    articleLink:  'https://www.geeksforgeeks.org/jump-game/',
  },
  {
    topicKey: 'Greedy', title: 'Jump Game II (Minimum Jumps)', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/jump-game-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=7SBVnw7GSTk',
    articleLink:  'https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/',
  },
  {
    topicKey: 'Greedy', title: 'Non-overlapping Intervals', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/non-overlapping-intervals/',
    youtubeLink:  'https://www.youtube.com/watch?v=nONCGxWoUfM',
    articleLink:  'https://www.geeksforgeeks.org/remove-interval/',
  },
  {
    topicKey: 'Greedy', title: 'Assign Cookies', difficulty: 'Easy', order: 8,
    practiceLink: 'https://leetcode.com/problems/assign-cookies/',
    youtubeLink:  'https://www.youtube.com/watch?v=IIqVFvKE6RY',
    articleLink:  'https://www.geeksforgeeks.org/assign-cookies/',
  },

  // ══════════════════════ TRIES ═════════════════════════════════════════════════
  {
    topicKey: 'Tries', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', order: 1,
    practiceLink: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    youtubeLink:  'https://www.youtube.com/watch?v=oobqoCJlHA0',
    articleLink:  'https://www.geeksforgeeks.org/trie-insert-and-search/',
  },
  {
    topicKey: 'Tries', title: 'Word Search II (Trie + Backtracking)', difficulty: 'Tough', order: 2,
    practiceLink: 'https://leetcode.com/problems/word-search-ii/',
    youtubeLink:  'https://www.youtube.com/watch?v=asbcE9mZz_U',
    articleLink:  'https://www.geeksforgeeks.org/boggle-find-all-possible-words-board-characters/',
  },
  {
    topicKey: 'Tries', title: 'Maximum XOR of Two Numbers in Array', difficulty: 'Tough', order: 3,
    practiceLink: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
    youtubeLink:  'https://www.youtube.com/watch?v=EIhAwfHubE8',
    articleLink:  'https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/',
  },
  {
    topicKey: 'Tries', title: 'Count Distinct Substrings (Trie)', difficulty: 'Medium', order: 4,
    practiceLink: 'https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1',
    youtubeLink:  'https://www.youtube.com/watch?v=RV0QETsfXV4',
    articleLink:  'https://www.geeksforgeeks.org/count-distinct-substrings-string-using-suffix-trie/',
  },

  // ══════════════════════ BIT MANIPULATION ═════════════════════════════════════
  {
    topicKey: 'Bit Manipulation', title: 'Single Number (XOR)', difficulty: 'Easy', order: 1,
    practiceLink: 'https://leetcode.com/problems/single-number/',
    youtubeLink:  'https://www.youtube.com/watch?v=qMPX1AOa83k',
    articleLink:  'https://www.geeksforgeeks.org/find-the-element-that-appears-once/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Number of 1 Bits (Hamming Weight)', difficulty: 'Easy', order: 2,
    practiceLink: 'https://leetcode.com/problems/number-of-1-bits/',
    youtubeLink:  'https://www.youtube.com/watch?v=5Km3utixwZs',
    articleLink:  'https://www.geeksforgeeks.org/count-set-bits-in-an-integer/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Counting Bits', difficulty: 'Easy', order: 3,
    practiceLink: 'https://leetcode.com/problems/counting-bits/',
    youtubeLink:  'https://www.youtube.com/watch?v=RyBM56RIWrM',
    articleLink:  'https://www.geeksforgeeks.org/count-set-bits-in-first-n-natural-numbers/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Reverse Bits', difficulty: 'Easy', order: 4,
    practiceLink: 'https://leetcode.com/problems/reverse-bits/',
    youtubeLink:  'https://www.youtube.com/watch?v=UcoN6UjAI64',
    articleLink:  'https://www.geeksforgeeks.org/write-an-efficient-c-program-to-reverse-bits-of-a-number/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Missing Number (XOR / Gauss)', difficulty: 'Easy', order: 5,
    practiceLink: 'https://leetcode.com/problems/missing-number/',
    youtubeLink:  'https://www.youtube.com/watch?v=JnkUKgFDV-E',
    articleLink:  'https://www.geeksforgeeks.org/find-the-missing-number/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Sum of Two Integers Without + Operator', difficulty: 'Medium', order: 6,
    practiceLink: 'https://leetcode.com/problems/sum-of-two-integers/',
    youtubeLink:  'https://www.youtube.com/watch?v=gVUrDV4tZfY',
    articleLink:  'https://www.geeksforgeeks.org/add-two-numbers-without-using-arithmetic-operators/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Single Number III (Two Missing)', difficulty: 'Medium', order: 7,
    practiceLink: 'https://leetcode.com/problems/single-number-iii/',
    youtubeLink:  'https://www.youtube.com/watch?v=jU6bWN7RlhM',
    articleLink:  'https://www.geeksforgeeks.org/find-two-non-repeating-elements-in-an-array-of-repeating-elements/',
  },
  {
    topicKey: 'Bit Manipulation', title: 'Power Set using Bit Masking', difficulty: 'Medium', order: 8,
    practiceLink: 'https://leetcode.com/problems/subsets/',
    youtubeLink:  'https://www.youtube.com/watch?v=LqKaUv1G3_I',
    articleLink:  'https://www.geeksforgeeks.org/power-set/',
  },
];

// ─── Seed Function ────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Topic.deleteMany({});
    await Problem.deleteMany({});
    console.log('Cleared existing data');

    const createdTopics = await Topic.insertMany(topics);
    const topicMap = {};
    createdTopics.forEach((t) => { topicMap[t.title] = t._id; });
    console.log(`Seeded ${createdTopics.length} topics`);

    const problems = problemsData.map(({ topicKey, ...rest }) => ({
      ...rest,
      topicId: topicMap[topicKey],
    }));

    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    console.log('\nSeed complete!');
    console.log(`  Topics   : ${createdTopics.length}`);
    console.log(`  Problems : ${problems.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
