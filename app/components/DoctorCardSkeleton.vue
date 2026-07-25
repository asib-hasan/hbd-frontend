<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between p-4 sm:p-5">
        <div class="flex flex-row items-start gap-3.5 sm:gap-5 w-full">
            <!-- Left: Image Skeleton -->
            <div class="relative shrink-0">
                <div class="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-1">
                    <USkeleton class="w-full h-full rounded-xl" />
                </div>
            </div>

            <!-- Right: Content Skeleton -->
            <div class="flex flex-col flex-1 min-w-0 pt-0.5">
                <USkeleton class="h-6 w-3/4 mb-2" />
                <USkeleton class="h-4 w-1/2 mb-3" />
                <div class="flex items-center gap-2 mb-3">
                    <USkeleton class="h-5 w-16 rounded-md" />
                    <USkeleton class="h-5 w-20 rounded-md" />
                </div>
                <USkeleton class="h-4 w-2/3 mb-2" />
                <USkeleton class="h-4 w-5/6" />
            </div>
        </div>

        <!-- Action Row Skeleton -->
        <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <USkeleton class="h-4 w-24" />
            <USkeleton class="h-9 w-32 rounded-xl" />
        </div>
    </div>
</template>
