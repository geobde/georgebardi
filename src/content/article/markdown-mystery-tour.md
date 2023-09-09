---
title: React Performance
publishDate: 2020-03-02 00:00:00
img: /assets/stock-1.webp
img_alt: React Performance
description: |
tags:
  - Reactjs
  - Performance
---

To address React’s performance, there are two primary phases to consider:

The initial rendering stage, which takes place when a component is first displayed on the screen.
The re-rendering stage, which occurs during subsequent renders of a component that is already visible on the screen.
When considering re-renders in React, it’s important to distinguish between necessary and unnecessary ones.

A necessary re-render is one that occurs when a component that’s the source of changes or directly uses new information needs to update itself. For instance, if a user types in an input field, the component managing its state must re-render on each keystroke.

On the other hand, an unnecessary re-render is one that happens due to a mistake or inefficient app architecture, where a component is re-rendered through different mechanisms. For example, if a user types in an input field and the entire page re-renders on each keystroke, the page has undergone an unnecessary re-render.

Components in React can re-render themselves for 4 main reasons:

state changes
context changes
hooks changes
re-renders of their parent or children components
Composition
One common strategy for preventing re-renders with composition is by moving the state down the component hierarchy. This means that instead of keeping the state in a higher-level component and passing it down to lower-level components, we keep the state in the lowest-level component that needs it.

Here’s an example:

function ParentComponent() {
const [count, setCount] = useState(0);

return (

<div>
<ChildComponent count={count} />
<button onClick={() => setCount(count + 1)}>Increment</button>
</div>
);
}

function ChildComponent({ count }) {
return <p>The count is {count}</p>;
}
In this example, the count state is kept in the ParentComponent and passed down to the ChildComponent as a prop. Every time the count state is updated, both the ParentComponent and the ChildComponent will re-render.

To prevent unnecessary re-renders, we can move the count state down to the ChildComponent:

function ParentComponent() {
return <ChildComponent />;
}

function ChildComponent() {
const [count, setCount] = useState(0);

return (

<div>
<p>The count is {count}</p>
<button onClick={() => setCount(count + 1)}>Increment</button>
</div>
);
}
In this updated example, the count state is kept in the ChildComponent. Since the ParentComponent is not concerned with the count state anymore, it doesn't need to re-render when the state is updated. Only the ChildComponent will re-render, which is the desired behavior.

Moving the state down can help us optimize the performance of our React applications by reducing the number of unnecessary re-renders. However, it’s important to keep in mind that this technique may not always be applicable, and we should always consider our specific use case and the trade-offs involved before implementing it.

To enhance re-rendering efficiency, a prevalent approach is to avoid redundant tasks. React provides options to reuse cached computations and bypass re-rendering if there are no changes since the last render.

Cached computations
React provides options to reuse cached computations for optimizing performance. One such option is to use the useMemo hook.

The useMemo hook is used to memoize a computation, which means that it caches the result of the computation and only recalculates it if the input values have changed. This can be useful when we have a computation that's expensive or time-consuming, and we want to avoid recalculating it unnecessarily.

Here’s an example:

function MyComponent({ items }) {
const expensiveOperation = useMemo(() => {
// Perform an expensive computation here
// ...
return result;
}, [items]);

return (

<div>
{items.map((item) => (
<Item key={item.id} item={item} expensiveOperation={expensiveOperation} />
))}
</div>
);
}

function Item({ item, expensiveOperation }) {
return (

<div>
<p>{item.name}</p>
<p>{expensiveOperation}</p>
</div>
);
}
In this example, the MyComponent component performs an expensive computation using the useMemo hook. The result of the computation is stored in the expensiveOperation variable, and it's only recalculated if the items prop changes.

The Item component receives the expensiveOperation prop as a cached value, which it can use without recalculating it.

By using the useMemo hook, we can avoid unnecessary recalculations of expensive computations and improve the performance of our React applications.

React.memo is a function that takes a component as its argument and returns a new memoized component. The memoized component only re-renders when its props have changed.

Here’s an example:

function MyComponent({ prop1, prop2 }) {
// component logic here
}

export default React.memo(MyComponent);
In this example, the MyComponent is wrapped with React.memo. The resulting memoized component will only re-render if the values of prop1 or prop2 have changed.

React.memo works by comparing the previous and current props using a shallow comparison. If the props are the same, the component is not re-rendered and the cached result is returned instead. If the props have changed, the component is re-rendered and the new result is cached.

Memoize Context Values
When using context, make sure to memoize the value property if it’s not a number, string, or boolean. This ensures that the component only re-renders when the context value changes.

Here’s an example:

const Component = () => {
const memoizedValue = useMemo(() => ({ value }), []);

return (
<Context.Provider ={memoizedValue}>
{children}
<Context.Provider>
)
}
React Server Components
React Server Components (RSC) have the potential to significantly improve the performance of server-side rendering (SSR) in React applications. This is because RSC allows the server to render only the necessary parts of the component tree, rather than rendering the entire tree, which can improve the efficiency of data transfer and lead to faster initial page loads.

How to debug your components?
I created a hook called useRerender to detect component mount, unmount & re-renders.

Example:

import { useRerender } from "use-is-rerender";

const Button = () => {
useRerender();
return <button>Click</button>;
};
Result in console:

Component mounted
Component <Button /> re-render with props { x : y }
Component unmounted
Github (https://github.com/geobde/useRerender)
