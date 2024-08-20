<template>

    <div class="Filters mt-2 mb-3 d-flex justify-content-between">

        <div class="Filters d-flex gap-3">
            <div class="Filter dropdown" v-for="(Filter,Index) in Filters">
                <button ref="Filter" class="btn dropdown-toggle px-3 trans3" type="button" data-bs-toggle="dropdown" @click="FilterIndex = Index">
                    {{ Filter.Name }}
                </button>
                <ul class="dropdown-menu">
                    <li @click="ActivateFitler( $event, Filter.Type, -1, Index )"><a class="dropdown-item pointer">{{ Filter.Option1 }}</a></li>
                    <li @click="ActivateFitler( $event, Filter.Type, 1, Index )"><a class="dropdown-item pointer">{{ Filter.Option2 }}</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li @click="DisableFitler( Filter.Name, Filter.Type, Index )"><a class="dropdown-item pointer">Remove Filter</a></li>
                </ul>
            </div>
        </div>
        <div class="Buttons">
            <button @click="ApplyFilters" class="ActiveBttn px-3 fw-bold s14 rd-5 shadow trans3 me-3"> {{ ButtonText }} </button>
            <button @click="DisableFitlers" class="bc-panel c-light-white px-3 fw-bold s14 rd-5 shadow trans3">Clear</button>
        </div>

    </div>

</template>

<script>

    export default {
        props:['Filters','ClearFilters'],
        data() { return {
            RemovedButton: false,
            ButtonText: 'Apply',
            FiltersSelected: [],
        }},
        methods: {
            ActivateFitler( Event, Type, Option, Index ) {
                let Refs = this.$refs.Filter
                Refs[Index].classList.add('Active')
                Refs[Index].textContent = Event.target.textContent
                const ExistAllReady = this.FiltersSelected.findIndex( Filter => Filter.Type == Type )
                ExistAllReady == -1 ? this.FiltersSelected.push({ Type: Type, OptionSelected: Option })
                : this.FiltersSelected[ExistAllReady].OptionSelected = Option
                this.ButtonText = 'Apply'
            },
            DisableFitler( Name, Type, Index ) {
                let Refs = this.$refs.Filter
                if ( Refs[Index].classList.contains('Active') ) {
                    Refs[Index].classList.remove('Active')
                    Refs[Index].textContent = Name
                    const FilterIndex = this.FiltersSelected.findIndex( Filter => Filter.Type == Type )
                    this.FiltersSelected.splice( FilterIndex,1 )
                    this.ButtonText = 'Apply'
                }
            },
            ApplyFilters() {
                this.$emit( 'ApplyFilters',this.FiltersSelected )
            },
            DisableFitlers() {
                this.$refs.Filter.forEach( (Filter,Index) => {
                    if ( Filter.classList.contains('Active') ) {
                        Filter.classList.remove('Active')
                        Filter.textContent = this.Filters[Index].Name
                    }
                })
                this.FiltersSelected = []
                this.ButtonText = 'Apply'
            },
        },
        watch: {
            ClearFilters( Val ) {
                if ( Val ) this.DisableFitlers()
            },
        },
    }

</script>

<style scoped lang="scss">

.Filters {
    .Filter {
        .btn {
            background-color: var(--Panel);
            color: var(--Light-White2);
            border: 1px solid var(--Light-Panel);
            transition: var(--Trans3);
        }
        .btn.Active {
            background-color: var(--Primary);
            color: var(--Text);
            transition: var(--Trans3);
            border-color: var(--Primary);
        }
        .btn:hover, .btn:focus {
            color: white;
            border-color: var(--Primary) ;
        }
    }
    .Buttons {
        button {
            line-height: 1.5;
            padding: 0.375rem 0.75rem;
            width: 75px;
        }
        button:last-of-type:hover {
            color: white;
        }
    }
}

</style> 