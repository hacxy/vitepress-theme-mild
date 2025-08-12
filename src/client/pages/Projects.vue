<script lang="ts" setup>
import type { ProjectItem, ThemeConfig } from '../../../types';
import { Icon } from '@iconify/vue';
import { useData } from 'vitepress';
import { computed } from 'vue';
import LANGUAGE_COLORS from '../../shared/datas/language-colors';
import Tag from '../components/Tag.vue';

const { theme, frontmatter } = useData<ThemeConfig>();
const finalList = computed<ProjectItem[]>(() => {
  return theme.value.project?.list || frontmatter.value.list;
});

function handleViewSourceCode(url?: string) {
  if (!url)
    return;
  window.open(url);
}
</script>

<template>
  <div class="projects-page-wrapper">
    <div class="container">
      <h1 class="title">
        {{ frontmatter.title }}
      </h1>
      <div class="description">
        {{ frontmatter.description }}
      </div>
      <div class="projects-list">
        <template v-for="item of finalList || []" :key="item.title">
          <div class="project-card" @click="handleViewSourceCode(item.repoUrl)">
            <div class="project-content">
              <div class="header">
                <Icon
                  :icon="item.icon
                    || theme.project?.defaultIcon
                    || 'ph:file-code-light'
                  "
                  ssr
                  class="header-icon"
                />
                <div>{{ item.title }}</div>
              </div>
              <div class="content">
                <div class="project-introduction">
                  {{ item.description }}
                </div>
                <div class="status">
                  <div class="status-item">
                    <Icon icon="pajamas:star-o" ssr class="status-icon" />
                    {{ item.stars }}
                  </div>
                  <div class="status-item">
                    <Icon icon="pajamas:fork" ssr class="status-icon" />
                    {{ item.forks }}
                  </div>
                  <div class="status-item" title="Last updated">
                    <Icon icon="pajamas:calendar" ssr class="status-icon" />
                    {{ item.lastUpdated }}
                  </div>
                </div>

                <div v-if="item?.language" class="language">
                  <div
                    class="dot"
                    :style="{
                      backgroundColor: (LANGUAGE_COLORS as any)[item?.language]
                        ?.color,
                    }"
                  />
                  {{ item.language }}
                </div>
                <div class="tags">
                  <Tag v-for="tag of item.tags" :key="tag" :text="tag" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects-page-wrapper {
  width: 100%;
  height: 100%;
  padding-bottom: 20px;

  @media (min-width: 1400px) {
    .container {
      max-width: 1400px;
    }
  }

  .container {
    padding: 0 1rem;
    margin: 0 auto;

    .title {
      font-weight: 700;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .description {
      margin-bottom: 1rem;
      text-align: center;
    }

    .projects-list {
      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      & {
        gap: 1rem;
        display: grid;
      }

      .project-card {
        border: 1px solid var(--vpt-project-card-border-color);
        border-radius: 8px;
        background-color: var(--vpt-project-card-bgc);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        transition:
          box-shadow 0.3s,
          color 0.3s;

        .header {
          padding: 20px 24px;
          box-sizing: border-box;
          font-weight: 500;
          color: var(--vpt-title-color);
          font-size: var(--vpt-title-font-size);
          display: flex;
          align-items: center;

          .header-icon {
            font-size: 25px;
            margin-right: 4px;
          }
        }

        .content {
          padding: 0 24px 0;
          font-size: var(--vpt-font-size);

          .status {
            display: flex;
            margin-bottom: 8px;
            margin-top: 8px;

            .status-item {
              display: flex;
              align-items: center;
              margin-right: 14px;
              font-weight: 500;

              .status-icon {
                margin-right: 3px;
              }
            }
          }

          .language {
            display: flex;
            align-items: center;
            margin-bottom: 6px;

            .dot {
              border-radius: 50%;
              width: 12px;
              height: 12px;
              margin-right: 6px;
            }
          }

          .tags {
            display: flex;
            margin-bottom: 8px;
            flex-wrap: wrap;
          }
        }
      }

      .project-card:hover {
        box-shadow: var(--vpt-box-shadow);
      }
    }
  }
}
</style>
