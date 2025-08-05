# Overview

এই প্রশ্নটি JavaScript এর `closure` কনসেপ্টের প্রাথমিক পরিচয় দেয়।
JavaScript এ কোনো ফাংশন তার নিজের স্কোপ এবং বাইরের স্কোপ এ ডিক্লার্ড ভারিয়েবল গুলো অ্যাক্সেস রাখতে পারে। এই স্কোপ এর ভিতরে থাকা সব ভ্যারিয়েবল এবং তাদের রেফারেন্স সহ যেই এনভায়রনমেন্ট তৈরি হয়, সেটাকে বলে `lexical environment`। 
একটা ফাংশন যখন তার সাথে তার `lexical environment` এর রেফারেন্স ধরে রাখে - even ফাংশনটা যেই স্কোপে ডিক্লার্ড হয়েছিলো সেটা এক্সিকিউট হয়ে শেষ হয়ে গেলেও তখন এই ফাংশন্টাকে বলে `closure`।

# Closure Example
JavaScript এ আমরা চাইলে ফাংশন এর মধ্যে ফাংশন ডিক্লার্ড এবং রিটার্ন করতে পারবো। এই ভিতরের ফাংশন এর কাছে উপর এর সব ভ্যারিয়েবল এর  অ্যাক্সেস থাকবে।
```javascript
function createAdder(a) {
  return function add(b) {
    const sum = a + b;
    return sum;
  }
}
const addTo2 = createAdder(2);
addTo2(5); // 7

```
এখানে ভিতরের ফাংশন `add` এর কাছে `a` আর্গুমেন্ট এর অ্যাক্সেস আছে ।


#  Closures vs Classes

তুমি হয়তো আগের example-এ খেয়াল করছো, `createAdder` অনেকটা class constructor-এর মতো কাজ করে। নিচে একটা class-based version দেখ:

```javascript
class Adder {
  constructor(a) {
    this.a = a;
  }

  add(b) {
    const sum = this.a + b;
    return sum;
  }
}

const addTo2 = new Adder(2);
console.log(addTo2.add(5)); // 7
```




সিনট্যাক্সে কিছু পার্থক্য থাকলেও, class আর closure—দুটোতেই আপনি কিছু state (মানে internal ডেটা) ইনপুট দিতে পারেন constructor-এর মতো করে।  এই state-এর উপর কাজ করা method বা function তৈরি করতে পারেন।



##  Encapsulation: Closures are safer

Closures-এর সবচেয়ে বড় সুবিধা হচ্ছে: এগুলো **real encapsulation** দেয়। Class ইউজ করলে, আপনি চাইলে বাইরের দিক থেকে internal ডেটা change করে ফেলতে পারেন:

```javascript
const addTo2 = new Adder(2);
addTo2.a = 99; // কেউ চাইলে a-র মান বদলে ফেলতে পারে!
```

এইটা হচ্ছে একটা বড় সমস্যা। কারণ এতে object-এর expected behavior ভেঙে যায়।

কিন্তু Closure ইউজ করলে:

```javascript
function createAdder(a) {
  return function (b) {
    return a + b;
  };
}

const addTo2 = createAdder(2);
```

এখানে `a` বাইরের দিক থেকে **access করা একদম impossible**। কারণ `a` শুধুমাত্র function scope-এর ভিতরে accessible।

2022 থেকে JavaScript-এ `#privateField` syntax (`this.#a`) ইউজ করে class-এর ভিতরেও encapsulation করা যায়, কিন্তু এখনও closure naturally more secure.



এখানেও একটা বড় performance পার্থক্য আছে।

ধরেন, আপনি একই টাইপের ১০০টা object তৈরি করলেন:

- **Class ইউজ করলে**: প্রতিটা instance শুধু একটা shared reference রাখে prototype-এর মেথড গুলার। তাই **memory usage কম** হয়।

- **Closure ইউজ করলে**: প্রতিবার outer function কল হলে নতুন করে method/function তৈরি হয়, তাই প্রতিটা instance আলাদা করে মেমোরি নেয়।  
  অর্থাৎ, **memory usage বেশি** হয়।

📌 তাই যদি আপনি অনেক instance বানাতে চান, আর অনেকগুলো method থাকে, তাহলে **class-based structure বেশি efficient** হবে।



## 🧪 Conclusion

closures is very weird concept! 😒