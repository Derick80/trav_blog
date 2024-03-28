import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'


const ImageCarouselFeatures = () => {

    return (
        <Accordion type="single"
            defaultValue='item-1'
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Carousel Overview</AccordionTrigger>
                <AccordionContent>
                    The Image Carousel loads 10 images per page. SearchParams are used to navigate to a specific page or limit the number of images displayed per page.

                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Pagination</AccordionTrigger>
                <AccordionContent>
                    Page Navigation: Underneath the Navigate by Page section you may navigate to a specific page by clicking on the page number. You may also navigate to the next or previous page by clicking on the chevron icons.
            When you reach the last page and the last image a double chevron icon will appear. Clicking on this icon will take you to the first page and the first image.                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>User Interactions</AccordionTrigger>
                <AccordionContent>
                    User Interactions: The User Interaction Menu allows users to like or share an image. You must be logged in to like or share an image.
                    The like count will increase by one when you click on the thumbs up icon. The share button will open a modal that will allow you to share the image to your social media accounts.
TBD:View Full Photo link: This link will open a modal that will display the full image. This feature is not yet fully implemented.

                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Admin Interactions</AccordionTrigger>
                <AccordionContent>
                    The user that owns the image may edit an image. For this app there will not be any users with admin privileges which means that a normal user may edit any image.
                    Since I am experimenting with multiple types of logins I also allow users with the role of admin to edit any image.
                    If the current user is an admin they will be able to click on the title, description, city , etc and edit that field. This will be saved to the database.


                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Image Navigation</AccordionTrigger>
                <AccordionContent>
                    Image Navigation: The Image Carousel has several ways to navigate through the images.
                    1. Image Chevrons: Clicking on the chevron icons will navigate to the next or previous image on the current page. If there is a page before or after the current page the chevrons icon will change to a double chevron icon. Clicking on this icon will navigate to the next or previous page. If there is no next or previous page the icon will be disabled.
                    2. Image Dots: Clicking on the dots will navigate to the image associated with the dot.
                    3. Pagination Navigation: Clicking on the page number will navigate to the page associated with the page number.
                    You may also navigate to the next or previous page by clicking on the chevron icons.
                    WHen you reach the last page and the last image a double chevron icon will appear. Clicking on this icon will take you to the first page and the first image.
                    When you reach the first page and the first image a double chevron icon will appear. Clicking on this icon will take you to the last page and the last image.


                </AccordionContent>
            </AccordionItem>

        </Accordion>

    )
}

export default ImageCarouselFeatures