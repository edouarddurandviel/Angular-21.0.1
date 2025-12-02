# Angular



```bash
/src

├── app

│   ├── core

│   │   ├── interceptors

│   │   │   └── auth.interceptor.ts

│   │   ├── guards

│   │   │   └── auth.guard.ts

│   │   ├── auth.service.ts

│   │   └── user.service.ts

│   ├── shared

│   │   ├── components

│   │   │   └── navbar/

│   │   │   └── sidebar/

│   │   ├── directives

│   │   │   └── debounce.directive.ts

│   │   ├── pipes

│   │   │   └── currency-format.pipe.ts

│   │   └── shared.module.ts

│   ├── features

│   │   ├── admin

│   │   │   ├── components

│   │   │   │   └── admin-dashboard.component.ts

│   │   │   ├── services

│   │   │   │   └── admin.service.ts

│   │   │   ├── admin.module.ts

│   │   │   └── admin-routing.module.ts

│   │   ├── user

│   │   │   ├── components

│   │   │   │   └── user-profile.component.ts

│   │   │   │   └── user-settings.component.ts

│   │   │   ├── services

│   │   │   │   └── user.service.ts

│   │   │   ├── user.module.ts

│   │   │   └── user-routing.module.ts

│   │   ├── products

│   │   │   ├── components

│   │   │   │   └── product-list.component.ts

│   │   │   │   └── product-details.component.ts

│   │   │   ├── services

│   │   │   │   └── product.service.ts

│   │   │   ├── products.module.ts

│   │   │   └── products-routing.module.ts

│   │   └── state

│   │       ├── reducers

│   │       │   └── auth.reducer.ts

│   │       │   └── user.reducer.ts

│   │       └── actions

│   │           └── auth.actions.ts

│   │           └── user.actions.ts

│   ├── app.component.ts

│   ├── app.module.ts

│   └── app-routing.module.ts

├── assets

├── environments

├── styles

├── main.ts

└── index.html
```


```javascript
// Copyright Brandon Roberts:
// https://x.com/brandontroberts/status/1710773567565050310

export const PostComponent = Component(() => {
  const posts = signal<Post[]>([]);
  const postsService = inject(PostsService);

  onInit(() => {
    postsService.getPosts().then((postList) => posts.set(postList));
  });

  afterNextRender(() => console.log('after next render'));

  afterRender(() => console.log('after render'));

  effect(() => console.log('posts', posts()));

  return {
    template: `
      <div class="text-2xl">
        @for (post of posts; track post.attributes.slug) {
          <div class="py-4">
            <a use:routerLink="[
              '/blog', 'posts', post.attributes.slug]" 
              class="text-gray-600">
              {{ post.attributes.title }}
            </a>
          </div>

          <p class="text-sm">
            {{ date(post.attributes.publishedDate, 
              'MMMM dd, yyyy') }}
          </p>
        }
      </div>
    `,
  };
});

```

