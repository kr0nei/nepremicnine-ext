const createImgElement = () => {
    const listItemImg = document.createElement('img');
    listItemImg.src = "index_files/price-tag-euro.svg";
    listItemImg.alt = "";
    listItemImg.className = "img-fluid";
    return listItemImg;
};


type Property = {
    htmlElement: HTMLElement,
    pricePerSquareMeter: Number
};
let properties: Property[] = [];
let propertiesWithAddSorter: Property[] = [];
function main() {
    const properties = document.querySelectorAll(".col-md-6.col-md-12.position-relative");
    const imgElement = createImgElement();
    properties.forEach((propertyElement, index) => {
        const areaElement = propertyElement.querySelector('ul[itemprop="disambiguatingDescription"] li:first-child');
        const priceElement = propertyElement.querySelector('h6');
        const attrList = propertyElement.querySelector('ul[itemprop="disambiguatingDescription"]');
        const listItem = document.createElement('li');


        const area = Number.parseFloat(areaElement?.textContent?.trim()?.split(' ')[0]?.replace(',', '.') ?? '0');
        const price = Number.parseFloat(priceElement?.textContent?.trim()?.split(' ')[0]?.replace('.', '')?.replace(',', '.') ?? '0');

        const pricePerSquareMeter = Math.round(price / area * 100) / 100;
        const pPSMel = document.createTextNode(pricePerSquareMeter + ' €/m');
        const sup = document.createElement('sup');
        sup.textContent = "2";

        listItem.appendChild(imgElement);
        listItem.appendChild(pPSMel);
        listItem.appendChild(sup);
        attrList?.appendChild(listItem);
        let property: Property = {
            htmlElement: propertyElement as HTMLElement,
            pricePerSquareMeter: pricePerSquareMeter
        };
        propertiesWithAddSorter.push(property);
    });
    let sortRow: HTMLElement = document.querySelector(".sort.cb")?.querySelector(".fl")!;
    let doSortEl: HTMLElement = document.createElement("div");
    let sortButton: HTMLButtonElement = document.createElement("button");
    doSortEl.className = "msort";
    sortButton.onclick = doSort!;
    sortButton.textContent = "Do Sort";
    doSortEl.appendChild(sortButton);
    sortRow.appendChild(doSortEl);
    //popup-sort-ul ui-dialog-content ui-widget-content
}
function doSort() {

    let parent: HTMLElement = document.querySelector<HTMLElement>(".property-2.row.column-sm.property-label.property-grid.list-view.no-sidebar")!;
    const parser = new DOMParser();
    const dividerElem = (parser.parseFromString('<div class="col-md-12" style="margin:20px 0"><hr></div>', 'text/html')).body.firstChild!;
    propertiesWithAddSorter = propertiesWithAddSorter?.sort(function (a: Property, b: Property) {
        return (a.pricePerSquareMeter < b.pricePerSquareMeter) ? 1 : -1;
    });
    parent.innerHTML = "";
    //console.log("doSort",propertiesWithAddSorter);
    for (let i = 0; i < propertiesWithAddSorter.length; i++) {
        parent.appendChild(propertiesWithAddSorter[i].htmlElement);
        parent.appendChild(dividerElem);
    }
}
window.onload = function () {
    main();
}
