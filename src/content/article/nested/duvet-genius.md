---
title: Micro Frontend Architecture
publishDate: 2020-03-04 00:00:00
img: /assets/stock-2.jpg
img_alt: Micro Frontend Architecture
description: |
tags:
  - Micro Frontend
  - Turborepo
  - Single-spa
---

This guide explains how to create a micro frontend app powered by:

Single-spa — A javascript router for front-end microservices
Turborepo — High-performance build system for Monorepos
React — JavaScript library for user interfaces
What is Micro frontend ?
Microfrontends are an architectural approach in software development that involves breaking down a web application into smaller, independent, and loosely coupled frontend modules or components.

Getting Started
Step 1: Set up TurboRepo

Turborepo is a high-performance build system for JavaScript and TypeScript codebases. It was designed after the workflows used by massive software engineering organizations to ship code at scale. Turborepo abstracts the complex configuration needed for monorepos and provides fast, incremental builds with zero-configuration remote caching.

npm install -g @turbo/turbo
Step 2: Create a TurboRepo Workspace

mkdir my-microfrontend-app
cd my-microfrontend-app
turbo init
Step 3: Create Microfrontend Applications

turbo app create microfrontend-react
Step 4: Install Single-SPA

Single-spa is a framework for bringing together multiple JavaScript microfrontends in a frontend application. Architecting your frontend using single-spa enables many benefits, such as:

Use multiple frameworks on the same page without page refreshing (React, AngularJS, Angular, Ember, or whatever you’re using)
Deploy your microfrontends independently
Write code using a new framework, without rewriting your existing app
Lazy load code for improved initial load time
cd packages/microfrontend-react
npm install single-spa react react-dom
Step 5: Configure Single-SPA in Microfrontend

Inside your microfrontend React project, configure single-spa to work with React. Create a file named root.app.js:

// packages/microfrontend-react/src/root.app.js
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

const Root = () => <div>Your React Microfrontend Content</div>;

const lifecycles = singleSpaReact({
React,
ReactDOM,
rootComponent: Root,
});

export const { bootstrap, mount, unmount } = lifecycles;
Step 6: Configure Your Microfrontend

In the microfrontend React project, you also need to configure your package.json to specify the main field and set the type to module:

// packages/microfrontend-react/package.json
{
"name": "microfrontend-react",
"version": "1.0.0",
"main": "src/root.app.js",
"type": "module",
// ...
}
Step 7: Set Up Your Main Application

Create a main application to host your microfrontends. You can create a new TurboRepo application or use an existing one. Make sure it’s configured to use single-spa.

Step 8: Register Microfrontends

In your main application, register your microfrontends using single-spa. Create a file named main.app.js:

// main.app.js
import { registerApplication, start } from 'single-spa';

registerApplication({
name: 'microfrontend-react',
app: () => System.import('@my-microfrontend-app/microfrontend-react'),
activeWhen: ['/react'], // Define the route or conditions to activate this microfrontend
});

start();
Step 9: Run Your Applications

Now, you can start your TurboRepo workspace and main application:

turbo dev
This command will start all the microfrontends and your main application. You can access your microfrontends by navigating to their respective routes (e.g., /react for the React microfrontend).

“Speeding Up” Web Application
Microfrontends are a paradigm that extends the principles of microservices to the frontend of web applications. They involve breaking down a monolithic frontend into smaller, self-contained modules or components. Each of these modules can be developed, deployed, and maintained independently, offering several advantages that can significantly enhance the development process and user experience. Let’s explore how microfrontends are transforming web application development.

1. Parallel Development

One of the most compelling advantages of microfrontends is the ability to facilitate parallel development. Different teams can work on separate modules independently, unburdened by the need to coordinate with other teams working on different parts of the application. This parallel development approach accelerates the overall development process, resulting in quicker time-to-market for new features and improvements.

2. Optimized Loading

Microfrontends enable more efficient loading of resources. Instead of loading all assets for the entire application upfront, each module can load only the assets it needs. This approach reduces the initial page load time and improves perceived performance for end-users, contributing to a smoother and more responsive experience.

3. Caching

Microfrontends thrive on their isolation, which allows them to take full advantage of caching mechanisms. Caching at the module level can dramatically reduce redundant data retrieval and processing, further enhancing response times. This intelligent use of caching not only speeds up the application but also reduces the strain on backend resources.

4. Scalability

Web applications often face variable levels of traffic. Microfrontends make it easier to scale individual components as needed. This means you can allocate resources to the most critical parts of your application, ensuring optimal performance even during peak usage periods. Scalability becomes more fine-grained and cost-effective.

5. Reduced Payload Size

Smaller, independent microfrontends typically have smaller codebases and asset sizes. As a result, they require less data transfer and offer faster rendering times on the client side. This reduction in payload size translates to a more efficient and speedy user experience.

6. Granular Updates

Microfrontends can be updated independently, allowing you to roll out performance optimizations or bug fixes for specific modules without affecting the entire application. This agility empowers development teams to address performance bottlenecks promptly and efficiently.

7. Isolation

In the event of a performance issue in one microfrontend, the rest of the application remains isolated and unaffected. Slowdowns or errors in one module are less likely to cascade and impact the entire system. This isolation enhances the overall robustness and stability of the application.

8. Lazy Loading

Microfrontends can implement lazy loading, meaning that modules are only loaded when they are needed. This approach further reduces the initial load time and improves the responsiveness of the application, as unnecessary modules are not loaded until requested.

Conclusion
In summary, Micro Frontend Architecture offers a modular, scalable, and efficient approach to web development that can significantly improve development speed, user experience, and overall application performance. Its adoption is a strategic move for organizations seeking to stay competitive and responsive in the dynamic world of web application development.
