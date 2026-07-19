<template>
    <div class="group bg-primary/[0.03] rounded-xl border border-primary/10 shadow-sm overflow-hidden flex">
        <div class="flex flex-row p-4 sm:p-5 gap-4 sm:gap-6 w-full">
            <!-- Left: Image Container -->
            <div class="shrink-0 flex flex-col items-center">
                <div class="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-xl overflow-hidden bg-white border border-gray-100 p-1 block shadow-sm">
                    <USkeleton class="w-full h-full rounded-lg" />
                    <USkeleton class="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10" />
                </div>
            </div>

            <!-- Right: Content -->
            <div class="flex flex-col flex-1 min-w-0 py-1">
                <!-- Name -->
                <USkeleton class="h-6 sm:h-7 w-3/4 mb-1.5" />
                
                <!-- Degrees -->
                <USkeleton class="h-4 w-1/2 mb-3.5" />

                <!-- Details List -->
                <div class="space-y-2.5">
                    <div class="flex items-center gap-2.5">
                        <USkeleton class="w-4 h-4 rounded-full shrink-0" />
                        <USkeleton class="h-4 w-2/3" />
                    </div>
                    <div class="flex items-center gap-2.5">
                        <USkeleton class="w-4 h-4 rounded-full shrink-0" />
                        <USkeleton class="h-4 w-5/6" />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center gap-3 mt-auto pt-4">
                    <USkeleton class="h-9 w-[120px] rounded" />
                    <USkeleton class="h-9 w-[120px] rounded" />
                </div>
            </div>
        </div>
    </div>
</template>
