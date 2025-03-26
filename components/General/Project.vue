<template>
  <div
    class="box-base !p-2 cursor-pointer"
    @click="$router.push(`/projects/show?id=${project.project_id}`)"
  >
    <div class="flex items-start justify-between mb-1">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <i class="fad fa-user-tie text-sm"></i>

          <h2
            class="truncate text-sm font-semibold max-w-[100px]"
            v-tooltip.top="project.client?.name"
          >
            {{ project.client?.name }}
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <h2
            class="truncate text-sm font-medium md:max-w-[230px] md:text-nowrap text-wrap"
            v-tooltip.top="project.name"
          >
            {{ project.name }}
          </h2>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button type="button">
          <i class="fal fa-ellipsis-h text-sm"></i>
        </button>
      </div>
    </div>

    <div
      v-if="project.engineers?.length > 0"
      class="flex items-center gap-2 flex-wrap my-2"
    >
      <span
        v-for="eng in project.engineers"
        :key="eng.engineer_id"
        class="text-xs border rounded-full px-3 flex items-center justify-center capitalize border-black truncate"
      >
        {{ eng.name }}
      </span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-[10px] font-semibold">
        {{ new Date(project.start_date).toDateString() }}
      </span>

      <span class="text-[10px] font-semibold">
        {{ project.total_mandays + " Mandays" }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
