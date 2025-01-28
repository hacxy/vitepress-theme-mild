---
sidebar:
  icon: simple-icons:bilibili
---

# BiliBili 视频播放

`Mild Theme` 提供了BiliBili视频播放的能力, 你可以在 markdown 文档中使用全局组件 `<Bili/>`, 这将会在文档中加入一个B站视频播放器.

## 使用

之后你只需要在这个组件中传递`bvid`:

```vue
<Bili bvid='BV15C41187cx'/>
```

 <Bili bvid='BV1oH4y1c7Kk'/>

---

- 指定播放时间

```vue
<Bili bvid='BV15C41187cx' time='3456'/>
```

<Bili bvid='BV15C41187cx' time='3456'/>

- 自动播放

```vue
<Bili bvid='BV15C41187cx' time='3456' autoplay/>
```

<Bili bvid='BV15C41187cx' time='3456' autoplay/>

## 属性

以下列出了`<Bili/>`组件中所有可用属性:

```ts
interface Props {
  /**
   * aid
   */
  aid?: string
  /**
   * bvid
   */
  bvid?: string
  /**
   * cid
   */
  cid?: string
  /**
   * 是否开启自动播放
   */
  autoplay?: boolean
  /**
   * 指定播放时间
   */
  time?: number | string
  /**
   * 指定视频分p
   */
  page?: number
  /**
   * 宽度
   */
  width?: number
  /**
   * 高度
   */
  height?: number
  /**
   * 尺寸比例
   */
  ratio?: number

  /**
   * 是否展示封面
   * @default true
   */
  poster?: boolean
}
```
