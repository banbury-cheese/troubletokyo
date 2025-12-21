#!/bin/bash

# List of all files that need fixing based on build errors
files=(
    "./app/about/about.module.scss"
    "./app/accessories/[category]/[handle]/accessory.module.scss"
    "./app/accessories/accessories.module.scss"
    "./app/accessories/plates/plates.module.scss"
    "./app/accessories/stickers/stickers.module.scss"
    "./app/apparel/[handle]/apparel.module.scss"
    "./app/apparels/apparels.module.scss"
    "./app/car/[handle]/car.module.scss"
    "./app/globals.scss"
    "./app/media/media.module.scss"
    "./app/products/products.module.scss"
    "./app/returns/returns.module.scss"
    "./components/FolderGrid/FolderGrid.module.scss"
    "./components/MenuNav/menuNav.module.scss"
    "./components/PageHeader/PageHeader.module.scss"
    "./components/PlateViewer3D/PlateViewer3D.module.scss"
    "./components/ProductGrid/ProductGrid.module.scss"
    "./components/ShowAllButton/ShowAllButton.module.scss"
    "./components/cart/OpenCart/openCart.module.scss"
    "./components/cart/currency-selector.module.scss"
    "./components/cart/modal/modal.module.scss"
    "./components/footer/footer.module.scss"
    "./components/imageCarousel/imageCarousel.module.scss"
    "./components/imageModal/imageModal.module.scss"
    "./components/sizeChart/sizeChart.module.scss"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Count directory depth
        dir=$(dirname "$file")
        depth=$(echo "$dir" | tr -cd '/' | wc -c | tr -d ' ')
        
        # Build relative path
        prefix=""
        for ((i=0; i<depth; i++)); do
            prefix="../$prefix"
        done
        
        relative_path="${prefix}styles/breakpoints.scss"
        
        # Replace @import with @use
        sed -i '' "s|@import \"styles/breakpoints.scss\";|@use \"$relative_path\" as *;|g" "$file"
        echo "  -> Fixed with path: $relative_path"
    else
        echo "File not found: $file"
    fi
done

echo "All files processed!"
