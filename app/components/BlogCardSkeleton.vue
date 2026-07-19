<template>
    <article class="group card-premium flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-soft">
        <div class="relative h-48 md:h-56 overflow-hidden">
            <USkeleton class="w-full h-full" />
            <div class="absolute top-4 left-4">
                <USkeleton class="h-6 w-20 rounded-full" />
            </div>
        </div>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center gap-4 mb-3">
                <USkeleton class="h-4 w-24" />
            </div>
            <USkeleton class="h-6 w-full mb-2" />
            <USkeleton class="h-6 w-3/4 mb-4" />
            <USkeleton class="h-4 w-full mb-1" />
            <USkeleton class="h-4 w-5/6 mb-4 flex-grow" />
            
            <div class="mt-auto pt-2 border-t border-border/50">
                <USkeleton class="h-4 w-24" />
            </div>
        </div>
    </article>
</template>
