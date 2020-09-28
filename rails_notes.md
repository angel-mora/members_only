# RAILS BEST NOTES

topic: polimorphic association

A polymorphic association is just a combination of two or more belongs_to associations. Because of this, you can act the same way you would when using two models that have a belongs_to association.

To find the best way of creating a model consider how your application might change and grow. If you’re considering STI but think you’ll add models or model fields that deviate from the shared structure, you might want to rethink your plan. If you think your structure is likely to remain the same, STI will *generally* be faster for querying.